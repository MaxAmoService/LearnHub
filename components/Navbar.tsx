"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { UserProfile } from "./UserProfile";
import { LoginModal } from "./LoginModal";
import { Menu, X, Home, LayoutGrid, GraduationCap, Trophy } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for navbar background
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/20"
            : "bg-slate-900/50 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="w-[92%] sm:w-[84%] max-w-none mx-auto px-1">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-lg shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
                🎓
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                LearnHub
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-150"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/modules"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-150"
              >
                <LayoutGrid className="w-4 h-4" />
                Module
              </Link>
              <Link
                href="/skilltree"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-150"
              >
                🌳 Skill Tree
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all duration-150"
              >
                <Trophy className="w-4 h-4" />
                Bestenliste
              </Link>

              <div className="w-px h-6 bg-slate-700/60 mx-2" />

              {user ? (
                <UserProfile />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  Anmelden
                </button>
              )}
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2">
              {user && <UserProfile />}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all"
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden py-4 border-t border-slate-800/60 animate-slide-up">
              <div className="flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                >
                  <Home className="w-4 h-4 text-slate-500" />
                  Dashboard
                </Link>
                <Link
                  href="/modules"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                >
                  <LayoutGrid className="w-4 h-4 text-slate-500" />
                  Module
                </Link>
                <Link
                  href="/skilltree"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                >
                  <span className="text-slate-500">🌳</span>
                  Skill Tree
                </Link>
                <Link
                  href="/leaderboard"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                >
                  <Trophy className="w-4 h-4 text-slate-500" />
                  Bestenliste
                </Link>
                {user && (
                  <Link
                    href="/profile"
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
                  >
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    Profil
                  </Link>
                )}
                {!user && (
                  <button
                    onClick={() => { setShowLogin(true); setShowMobileMenu(false); }}
                    className="mt-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl text-sm font-semibold text-white text-center transition-all"
                  >
                    Anmelden
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
