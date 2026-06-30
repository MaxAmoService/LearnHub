"use client";

export function Footer() {
  const openCookieSettings = () => {
    // Cookie-Banner neu anzeigen
    try {
      localStorage.removeItem("learnhub-cookie-consent");
    } catch {}
    window.location.reload();
  };

  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="w-[84%] max-w-none mx-auto px-1 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎓</span>
            <span className="font-semibold gradient-text">LearnHub</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 LearnHub - Built with Next.js & ❤️
          </p>
          <div className="flex gap-4 text-slate-500 text-sm">
            <button
              onClick={openCookieSettings}
              className="hover:text-white transition-colors"
            >
              Cookie-Einstellungen
            </button>
            <a href="/datenschutz" className="hover:text-white transition-colors">Datenschutz</a>
            <a href="/impressum" className="hover:text-white transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
