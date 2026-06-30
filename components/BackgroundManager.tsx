"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { PixelBackground } from "./PixelBackground";

export function BackgroundManager() {
  const { user } = useAuth();
  const [bgTheme, setBgTheme] = useState<"default" | "pixel">("default");

  useEffect(() => {
    const theme = user?.settings?.backgroundTheme
      || (typeof window !== "undefined" ? (localStorage.getItem("learnhub-bg-theme") as "default" | "pixel" | null) : null)
      || "default";
    setBgTheme(theme);
  }, [user?.settings?.backgroundTheme]);

  if (bgTheme !== "pixel") return null;
  return <PixelBackground />;
}
