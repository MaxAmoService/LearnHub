"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      // Ctrl/Cmd + K → Focus search on modules page
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        router.push("/modules");
        setTimeout(() => {
          const input = document.querySelector('input[placeholder*="Such"]') as HTMLInputElement;
          input?.focus();
        }, 100);
      }

      // G then D → Dashboard
      if (e.key === "g" && !e.ctrlKey && !e.metaKey) {
        const next = (ev: KeyboardEvent) => {
          if (ev.key === "d") { router.push("/"); cleanup(); }
          if (ev.key === "m") { router.push("/modules"); cleanup(); }
          if (ev.key === "p") { router.push("/profile"); cleanup(); }
          if (ev.key === "l") { router.push("/leaderboard"); cleanup(); }
          if (ev.key === "s") { router.push("/skilltree"); cleanup(); }
          setTimeout(cleanup, 1000);
        };
        const cleanup = () => window.removeEventListener("keydown", next);
        window.addEventListener("keydown", next);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
