"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield, Settings } from "lucide-react";

const STORAGE_KEY = "learnhub-cookie-consent";

export type ConsentLevel = "all" | "necessary" | "rejected";

export function getConsent(): ConsentLevel | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY) as ConsentLevel | null;
  } catch {
    return null;
  }
}

export function setConsent(level: ConsentLevel) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, level);

  // Google Consent Mode v2
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).gtag?.("consent", "update", {
    analytics_storage: level === "all" ? "granted" : "denied",
    ad_storage: level === "all" ? "granted" : "denied",
    ad_user_data: level === "all" ? "granted" : "denied",
    ad_personalization: level === "all" ? "granted" : "denied",
  });
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (!consent) {
      // Kurz verzögern damit die Seite erst lädt
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setConsent("all");
    setVisible(false);
  };

  const handleReject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  const handleNecessary = () => {
    setConsent("necessary");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="max-w-4xl mx-auto m-4">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-5 sm:p-6 shadow-2xl">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
              <Cookie className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                🍪 Cookie-Einstellungen
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Wir nutzen Cookies und Google Analytics um die Plattform zu verbessern.
                Du kannst wählen welche Cookies du zulassen möchtest.
              </p>
            </div>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="mb-4 space-y-3 animate-fade-in">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-white">Notwendige Cookies</span>
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    Immer aktiv
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Für Login, Fortschritt und Grundfunktionen. Keine Weitergabe an Dritte.
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  <span className="font-medium text-white">Analytics & Marketing</span>
                </div>
                <p className="text-xs text-slate-400">
                  Google Analytics hilft uns zu verstehen wie die Plattform genutzt wird.
                  Daten werden anonymisiert verarbeitet. Mehr in unserer{" "}
                  <a href="/datenschutz" className="text-blue-400 hover:underline">
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Alle akzeptieren
            </button>
            <button
              onClick={handleNecessary}
              className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Nur notwendige
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2.5 text-slate-400 hover:text-white transition-colors text-sm"
            >
              {showDetails ? "Weniger" : "Details"}
            </button>
          </div>

          {/* Links */}
          <div className="mt-3 pt-3 border-t border-slate-800 flex gap-4 text-xs text-slate-500">
            <a href="/impressum" className="hover:text-slate-300 transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-slate-300 transition-colors">
              Datenschutzerklärung
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
