// ============================================================================
// Reward System — Avatare & Frames freischalten (mit Animationen)
// ============================================================================

export interface AvatarOption {
  id: string;
  emoji: string;
  name: string;
  unlockLevel: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  leaderboardRank?: number; // Nur für diesen Rang freischalten
}

export interface FrameOption {
  id: string;
  name: string;
  unlockLevel: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  animated: boolean;
  leaderboardRank?: number;
}

// ─── Avatare ────────────────────────────────────────────────────────────────

export const AVATARS: AvatarOption[] = [
  // Common (Level 1)
  { id: "nerd", emoji: "🤓", name: "Nerd", unlockLevel: 1, rarity: "common" },
  { id: "cool", emoji: "😎", name: "Cool", unlockLevel: 1, rarity: "common" },
  { id: "cat", emoji: "🐱", name: "Katze", unlockLevel: 1, rarity: "common" },
  { id: "dog", emoji: "🐶", name: "Hund", unlockLevel: 1, rarity: "common" },
  { id: "panda", emoji: "🐼", name: "Panda", unlockLevel: 1, rarity: "common" },
  { id: "koala", emoji: "🐨", name: "Koala", unlockLevel: 1, rarity: "common" },

  // Common (Level 2)
  { id: "fox", emoji: "🦊", name: "Fuchs", unlockLevel: 2, rarity: "common" },
  { id: "eule", emoji: "🦉", name: "Eule", unlockLevel: 2, rarity: "common" },
  { id: "penguin", emoji: "🐧", name: "Pinguin", unlockLevel: 2, rarity: "common" },
  { id: "butterfly", emoji: "🦋", name: "Schmetterling", unlockLevel: 2, rarity: "common" },
  { id: "octopus", emoji: "🐙", name: "Oktopus", unlockLevel: 2, rarity: "common" },
  { id: "rabbit", emoji: "🐰", name: "Hase", unlockLevel: 2, rarity: "common" },

  // Rare (Level 3)
  { id: "unicorn", emoji: "🦄", name: "Einhorn", unlockLevel: 3, rarity: "rare" },
  { id: "frog", emoji: "🐸", name: "Frosch", unlockLevel: 3, rarity: "rare" },
  { id: "lion", emoji: "🦁", name: "Löwe", unlockLevel: 3, rarity: "rare" },
  { id: "tiger", emoji: "🐯", name: "Tiger", unlockLevel: 3, rarity: "rare" },
  { id: "bear", emoji: "🐻", name: "Bär", unlockLevel: 3, rarity: "rare" },

  // Epic (Level 5)
  { id: "dragon", emoji: "🐲", name: "Drache", unlockLevel: 5, rarity: "epic" },
  { id: "eagle", emoji: "🦅", name: "Adler", unlockLevel: 5, rarity: "epic" },
  { id: "shark", emoji: "🦈", name: "Hai", unlockLevel: 5, rarity: "epic" },
  { id: "wolf", emoji: "🐺", name: "Wolf", unlockLevel: 5, rarity: "epic" },
  { id: "phoenix", emoji: "🔥", name: "Phönix", unlockLevel: 5, rarity: "epic" },

  // Legendary (Level 8)
  { id: "crown", emoji: "👑", name: "Krone", unlockLevel: 8, rarity: "legendary" },
  { id: "gem", emoji: "💎", name: "Diamant", unlockLevel: 8, rarity: "legendary" },
  { id: "star", emoji: "🌟", name: "Stern", unlockLevel: 8, rarity: "legendary" },
  { id: "rocket", emoji: "🚀", name: "Rakete", unlockLevel: 8, rarity: "legendary" },
  { id: "alien", emoji: "👽", name: "Alien", unlockLevel: 8, rarity: "legendary" },

  // Leaderboard-Exklusiv (nur für Platzhalter)
  { id: "trophy", emoji: "🏆", name: "Champion", unlockLevel: 0, rarity: "legendary", leaderboardRank: 1 },
  { id: "medal1", emoji: "🥇", name: "Gold-Medaille", unlockLevel: 0, rarity: "legendary", leaderboardRank: 1 },
  { id: "medal2", emoji: "🥈", name: "Silber-Medaille", unlockLevel: 0, rarity: "epic", leaderboardRank: 2 },
  { id: "medal3", emoji: "🥉", name: "Bronze-Medaille", unlockLevel: 0, rarity: "epic", leaderboardRank: 3 },
];

// ─── Frames ─────────────────────────────────────────────────────────────────

export const FRAMES: FrameOption[] = [
  // Common (immer)
  { id: "none", name: "Kein", unlockLevel: 1, rarity: "common", animated: false },
  { id: "slate", name: "Grau", unlockLevel: 1, rarity: "common", animated: false },
  { id: "blue", name: "Blau", unlockLevel: 1, rarity: "common", animated: false },

  // Rare (Level 2)
  { id: "emerald", name: "Smaragd", unlockLevel: 2, rarity: "rare", animated: false },
  { id: "rose", name: "Rose", unlockLevel: 2, rarity: "rare", animated: false },

  // Rare (Level 3)
  { id: "violet", name: "Violett", unlockLevel: 3, rarity: "rare", animated: false },
  { id: "amber", name: "Bernstein", unlockLevel: 3, rarity: "rare", animated: false },

  // Epic (Level 5) — animiert
  { id: "neon", name: "Neon", unlockLevel: 5, rarity: "epic", animated: true },
  { id: "flame", name: "Flammen", unlockLevel: 5, rarity: "epic", animated: true },
  { id: "ice", name: "Eis", unlockLevel: 5, rarity: "epic", animated: true },

  // Legendary (Level 7) — animiert
  { id: "gold", name: "Gold", unlockLevel: 7, rarity: "legendary", animated: true },
  { id: "rainbow", name: "Regenbogen", unlockLevel: 7, rarity: "legendary", animated: true },
  { id: "galaxy", name: "Galaxie", unlockLevel: 7, rarity: "legendary", animated: true },

  // Legendary (Level 10) — special
  { id: "pulse", name: "Pulsieren", unlockLevel: 10, rarity: "legendary", animated: true },
  { id: "cosmic", name: "Kosmisch", unlockLevel: 10, rarity: "legendary", animated: true },
  { id: "fire-orbit", name: "Feuer-Orbit", unlockLevel: 10, rarity: "legendary", animated: true },
  { id: "energy", name: "Energie", unlockLevel: 10, rarity: "legendary", animated: true },
  { id: "shadow", name: "Schatten", unlockLevel: 10, rarity: "legendary", animated: true },

  // Leaderboard-Exklusiv
  { id: "champion", name: "Champion", unlockLevel: 0, rarity: "legendary", animated: true, leaderboardRank: 1 },
  { id: "silver", name: "Silber", unlockLevel: 0, rarity: "epic", animated: true, leaderboardRank: 2 },
  { id: "bronze-frame", name: "Bronze", unlockLevel: 0, rarity: "epic", animated: true, leaderboardRank: 3 },
];

// ─── Helper ─────────────────────────────────────────────────────────────────

export function getUnlockedAvatars(level: number, leaderboardRank?: number): AvatarOption[] {
  return AVATARS.filter((a) => {
    if (a.leaderboardRank !== undefined) {
      return leaderboardRank !== undefined && leaderboardRank === a.leaderboardRank;
    }
    return level >= a.unlockLevel;
  });
}

export function getUnlockedFrames(level: number, leaderboardRank?: number): FrameOption[] {
  return FRAMES.filter((f) => {
    if (f.leaderboardRank !== undefined) {
      return leaderboardRank !== undefined && leaderboardRank === f.leaderboardRank;
    }
    return level >= f.unlockLevel;
  });
}

export function isAvatarUnlocked(avatar: AvatarOption, level: number, leaderboardRank?: number): boolean {
  if (avatar.leaderboardRank !== undefined) {
    // Exakter Rang — nur der Besitzer kann es auswählen
    return leaderboardRank !== undefined && leaderboardRank === avatar.leaderboardRank;
  }
  return level >= avatar.unlockLevel;
}

export function isFrameUnlocked(frame: FrameOption, level: number, leaderboardRank?: number): boolean {
  if (frame.leaderboardRank !== undefined) {
    return leaderboardRank !== undefined && leaderboardRank === frame.leaderboardRank;
  }
  return level >= frame.unlockLevel;
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case "common": return "text-slate-400";
    case "rare": return "text-blue-400";
    case "epic": return "text-violet-400";
    case "legendary": return "text-amber-400";
    default: return "text-slate-400";
  }
}

export function getRarityBg(rarity: string): string {
  switch (rarity) {
    case "common": return "bg-slate-500/15 border-slate-500/30";
    case "rare": return "bg-blue-500/15 border-blue-500/30";
    case "epic": return "bg-violet-500/15 border-violet-500/30";
    case "legendary": return "bg-amber-500/15 border-amber-500/30";
    default: return "bg-slate-500/15 border-slate-500/30";
  }
}

export function getRarityBorder(rarity: string): string {
  switch (rarity) {
    case "common": return "border-slate-500";
    case "rare": return "border-blue-500";
    case "epic": return "border-violet-500";
    case "legendary": return "border-amber-500";
    default: return "border-slate-500";
  }
}
