import { Home, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">404</h1>
        <p className="text-lg text-slate-400 mb-8">
          Diese Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20"
          >
            <Home className="w-4 h-4" />
            Zum Dashboard
          </Link>
          <Link
            href="/modules"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-300 transition-colors"
          >
            <Search className="w-4 h-4" />
            Module durchsuchen
          </Link>
        </div>
      </div>
    </div>
  );
}
