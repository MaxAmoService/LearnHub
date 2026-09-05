"use client";

import "./globals.css";
import "katex/dist/katex.min.css";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import LearningClicker from "@/components/LearningClicker";
import LofiPlayer from "@/components/LofiPlayer";
import { XPNotification } from "@/components/XPNotification";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { BackgroundManager } from "@/components/BackgroundManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <title>LearnHub — Interaktive Lernplattform</title>
        <meta name="description" content="Lerne Mathe, Programmierung und IHK-Inhalte interaktiv und kostenlos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            try {
              var t = localStorage.getItem('learnhub-theme');
              if (t === 'light') { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark'); }
              else { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light'); }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-screen bg-dark-950 dark:bg-dark-950 text-slate-100 dark:text-slate-100">
        <XPNotification />
        <KeyboardShortcuts />
        <GoogleAnalytics />
        <ThemeProvider>
          <AuthProvider>
            <BackgroundManager />
            <Navbar />
            <main className="w-[92%] sm:w-[88%] lg:w-[84%] max-w-none mx-auto px-1 py-2">
              {children}
            </main>
            <Footer />
            <CookieConsent />
            <LearningClicker />
            <LofiPlayer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
