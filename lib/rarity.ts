// Geteilte Seltenheits-Styles (Achievements + Lern-Clicker).

export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface RarityStyles {
  bg: string;
  border: string;
  text: string;
}

export const RARITY_STYLES: Record<Rarity, RarityStyles> = {
  common: { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-300" },
  rare: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-300" },
  epic: { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-300" },
  legendary: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-300" },
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: "Häufig",
  rare: "Selten",
  epic: "Episch",
  legendary: "Legendär",
};
