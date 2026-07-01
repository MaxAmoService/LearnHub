"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./AuthProvider";
import {
  loadClickerState,
  saveClickerClick,
  saveClickerTick,
  saveFullClickerState,
  buyClickerUpgradeBulk,
  prestigeClickerState,
  openPetBox,
  equipPet,
  upgradePet,
  resetClickerState,
  getPetDefs,
  getBoxTiers,
  getPetBonuses,
  type ClickerState,
} from "@/lib/auth";
import {
  Sparkles,
  Zap,
  ChevronDown,
  ChevronUp,
  X,
  GripVertical,
  Flame,
  PawPrint,
  Crown,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Upgrade {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseCost: number;
  costMultiplier: number;
  effect: "clickPower" | "autoSpeed" | "autoAmount";
  value: number;
}

interface PetDef {
  id: string;
  name: string;
  emoji: string;
  bonus: string;
  bonusType: "auto" | "click" | "speed";
  bonusPercent: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  module: string;
}

interface RevealedPet {
  pet: PetDef;
  id: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const UPGRADES: Upgrade[] = [
  // Klick-Punkte
  { id: "click1", name: "Scharfer Stift", description: "+1 Punkt pro Klick", icon: "✏️", baseCost: 10, costMultiplier: 1.5, effect: "clickPower", value: 1 },
  { id: "click2", name: "Mechanischer Stift", description: "+5 Punkte pro Klick", icon: "🖊️", baseCost: 100, costMultiplier: 1.8, effect: "clickPower", value: 5 },
  { id: "click3", name: "Laser-Stift", description: "+25 Punkte pro Klick", icon: "✒️", baseCost: 1000, costMultiplier: 2.0, effect: "clickPower", value: 25 },
  { id: "click4", name: "Plasma-Stift", description: "+120 Punkte pro Klick", icon: "🖊️", baseCost: 12000, costMultiplier: 2.2, effect: "clickPower", value: 120 },
  { id: "click5", name: "Quanten-Stift", description: "+600 Punkte pro Klick", icon: "✒️", baseCost: 150000, costMultiplier: 2.5, effect: "clickPower", value: 600 },
  { id: "click6", name: "Dunkle-Materie-Stift", description: "+3.000 Punkte pro Klick", icon: "🌀", baseCost: 2000000, costMultiplier: 2.8, effect: "clickPower", value: 3000 },
  { id: "click7", name: "Antimaterie-Stift", description: "+15.000 Punkte pro Klick", icon: "💫", baseCost: 50000000, costMultiplier: 3.0, effect: "clickPower", value: 15000 },
  { id: "click8", name: "Singulärer Stift", description: "+100.000 Punkte pro Klick", icon: "🕳️", baseCost: 2000000000, costMultiplier: 3.5, effect: "clickPower", value: 100000 },

  // Auto-Generierung
  { id: "auto1", name: "Lern-Assistent", description: "+1 Punkt/Sekunde", icon: "🤖", baseCost: 50, costMultiplier: 1.6, effect: "autoAmount", value: 1 },
  { id: "auto2", name: "Tutor-Bot", description: "+5 Punkte/Sekunde", icon: "🧠", baseCost: 500, costMultiplier: 1.8, effect: "autoAmount", value: 5 },
  { id: "auto3", name: "KI-Professor", description: "+25 Punkte/Sekunde", icon: "🎓", baseCost: 5000, costMultiplier: 2.0, effect: "autoAmount", value: 25 },
  { id: "auto4", name: "KI-Fakultät", description: "+120 Punkte/Sekunde", icon: "🏫", baseCost: 60000, costMultiplier: 2.2, effect: "autoAmount", value: 120 },
  { id: "auto5", name: "KI-Universität", description: "+600 Punkte/Sekunde", icon: "🏛️", baseCost: 750000, costMultiplier: 2.5, effect: "autoAmount", value: 600 },
  { id: "auto6", name: "KI-Megakonzern", description: "+3.000 Punkte/Sekunde", icon: "🏢", baseCost: 10000000, costMultiplier: 2.8, effect: "autoAmount", value: 3000 },
  { id: "auto7", name: "KI-Weltnetz", description: "+15.000 Punkte/Sekunde", icon: "🌐", baseCost: 250000000, costMultiplier: 3.0, effect: "autoAmount", value: 15000 },
  { id: "auto8", name: "KI-Singularität", description: "+100.000 Punkte/Sekunde", icon: "🔮", baseCost: 5000000000, costMultiplier: 3.5, effect: "autoAmount", value: 100000 },

  // Geschwindigkeit
  { id: "speed1", name: "Schneller Denker", description: "Auto 10% schneller", icon: "⚡", baseCost: 200, costMultiplier: 2.0, effect: "autoSpeed", value: 0.9 },
  { id: "speed2", name: "Blitzgeist", description: "Auto 15% schneller", icon: "🌩️", baseCost: 2500, costMultiplier: 2.3, effect: "autoSpeed", value: 0.85 },
  { id: "speed3", name: "Zeitraffer", description: "Auto 20% schneller", icon: "⏱️", baseCost: 30000, costMultiplier: 2.5, effect: "autoSpeed", value: 0.8 },
  { id: "speed4", name: "Lichtgeschwindigkeit", description: "Auto 25% schneller", icon: "🌌", baseCost: 400000, costMultiplier: 3.0, effect: "autoSpeed", value: 0.75 },
  { id: "speed5", name: "Warp-Antrieb", description: "Auto 30% schneller", icon: "🚀", baseCost: 5000000, costMultiplier: 3.5, effect: "autoSpeed", value: 0.7 },
  { id: "speed6", name: "Zeitschleife", description: "Auto 35% schneller", icon: "➿", baseCost: 100000000, costMultiplier: 4.0, effect: "autoSpeed", value: 0.65 },

  // Synergie
  { id: "syn1", name: "Neuronales Netz", description: "Auto-Bonus: +2% Klick-Power pro Auto-Upgrade", icon: "🔗", baseCost: 8000, costMultiplier: 2.5, effect: "clickPower", value: 0 },
  { id: "syn2", name: "Feedback-Schleife", description: "Klick-Bonus: +3% Auto-Speed pro Klick-Upgrade", icon: "🔄", baseCost: 15000, costMultiplier: 2.8, effect: "autoSpeed", value: 1 },
  { id: "syn3", name: "Schwarzes Loch", description: "Alle Boni +10% pro Prestige-Level", icon: "🕳️", baseCost: 500000000, costMultiplier: 5.0, effect: "clickPower", value: 0 },
];

const CLICK_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("click"));
const AUTO_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("auto"));
const SPEED_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("speed"));
const SYN_UPGRADES = UPGRADES.filter((u) => u.id.startsWith("syn"));

const BOX_DEFS = [
  { type: "common", name: "Lern-Box", emoji: "📦", cost: 100, desc: "Common/Rare", color: "from-slate-500/20 to-slate-600/20", border: "border-slate-500/40" },
  { type: "rare", name: "Wissens-Box", emoji: "🎁", cost: 500, desc: "Rare/Epic", color: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/40" },
  { type: "epic", name: "Meister-Box", emoji: "👑", cost: 2000, desc: "Epic/Legendary", color: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/40" },
  { type: "prestige", name: "Prestige-Box", emoji: "✨", cost: 10000, desc: "Legendary", color: "from-rose-500/20 to-amber-500/20", border: "border-rose-500/40" },
];

const RARITY_COLORS: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  common: { text: "text-slate-300", bg: "bg-slate-500/10", border: "border-slate-500/30", glow: "shadow-slate-500/20" },
  rare: { text: "text-blue-300", bg: "bg-blue-500/10", border: "border-blue-500/30", glow: "shadow-blue-500/30" },
  epic: { text: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/30", glow: "shadow-violet-500/40" },
  legendary: { text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-amber-500/50" },
};

const DEFAULT_STATE: ClickerState = {
  points: 0,
  totalPoints: 0,
  clickPower: 1,
  autoSpeed: 1000,
  autoAmount: 0,
  prestigeMultiplier: 1,
  prestigePoints: 0,
  prestigeLevel: 0,
  prestige_skill_critChance: 0,
  prestige_skill_luck: 0,
  prestige_skill_autoBoost: 0,
  prestige_skill_speedBoost: 0,
  prestige_skill_goldenTouch: 0,
  prestige_skill_petLover: 0,
  prestige_skill_petSlots: 0,
  prestige_skill_clickMastery: 0,
  prestige_skill_goldRush: 0,
  upgrades: {},
  ownedPets: [],
  activePet: null,
  activePets: [],
  petLevels: {},
  equippedAvatar: "📚",
  equippedFrame: "none",
  ownedCosmetics: [],
  lastTick: new Date().toISOString(),
};

const MILESTONES = [
  { points: 50, label: "Erste Schritte", icon: "🌱" },
  { points: 200, label: "Lern-Anfänger", icon: "📖" },
  { points: 500, label: "Wissbegierig", icon: "🔍" },
  { points: 1500, label: "Fleißig", icon: "🐝" },
  { points: 5000, label: "Lern-Maschine", icon: "⚙️" },
  { points: 15000, label: "Gelehrter", icon: "🎓" },
  { points: 50000, label: "Meister", icon: "🏆" },
  { points: 150000, label: "Genie", icon: "🧠" },
  { points: 500000, label: "Legendär", icon: "⭐" },
  { points: 1000000, label: "Prestige I", icon: "👑" },
  { points: 5000000, label: "Prestige II", icon: "💫" },
  { points: 25000000, label: "Prestige III", icon: "🌌" },
  { points: 100000000, label: "Transzendenz", icon: "✨" },
  { points: 500000000, label: "Kosmisch", icon: "🪐" },
  { points: 2000000000, label: "Universell", icon: "🌠" },
  { points: 10000000000, label: "Multiversell", icon: "🔮" },
  { points: 50000000000, label: "Omnipräsent", icon: "🌀" },
  { points: 250000000000, label: "Göttlich", icon: "☀️" },
  { points: 1000000000000, label: "Absolut", icon: "💎" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getUpgradeCost(upgrade: Upgrade, count: number): number {
  return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, count));
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000_000) return short(n / 1_000_000_000_000) + "T";
  if (n >= 1_000_000_000) return short(n / 1_000_000_000) + "B";
  if (n >= 1_000_000) return short(n / 1_000_000) + "M";
  if (n >= 1_000) return short(n / 1_000) + "K";
  return Math.floor(n).toLocaleString("de-DE");
}
function short(v: number): string {
  // Zeigt 1 Dezimalstelle nur wenn nötig, sonst ganzzahlig
  const r = v.toFixed(1);
  return r.endsWith(".0") ? Math.floor(v).toString() : r;
}

function getPrestigeAvatar(level: number, baseAvatar: string): string {
  if (level >= 30) return "☀️";
  if (level >= 25) return "🔮";
  if (level >= 20) return "🌌";
  if (level >= 15) return "👑";
  if (level >= 12) return "💎";
  if (level >= 8) return "🥇";
  if (level >= 5) return "🥈";
  if (level >= 3) return "🥉";
  if (level >= 1) return "⭐";
  return baseAvatar;
}

function getPrestigeGlow(level: number): string {
  if (level >= 30) return "shadow-[0_0_24px_rgba(251,191,36,0.7)]";
  if (level >= 25) return "shadow-[0_0_22px_rgba(168,85,247,0.6)]";
  if (level >= 20) return "shadow-[0_0_20px_rgba(59,130,246,0.6)]";
  if (level >= 15) return "shadow-[0_0_20px_rgba(251,191,36,0.6)]";
  if (level >= 12) return "shadow-[0_0_16px_rgba(99,102,241,0.5)]";
  if (level >= 8) return "shadow-[0_0_12px_rgba(234,179,8,0.4)]";
  if (level >= 5) return "shadow-[0_0_10px_rgba(148,163,184,0.3)]";
  if (level >= 3) return "shadow-[0_0_8px_rgba(180,130,80,0.3)]";
  if (level >= 1) return "shadow-[0_0_6px_rgba(250,204,21,0.2)]";
  return "";
}

function getPrestigeRing(level: number): string {
  if (level >= 30) return "ring-2 ring-amber-400/60";
  if (level >= 25) return "ring-2 ring-violet-400/50";
  if (level >= 20) return "ring-2 ring-blue-400/50";
  if (level >= 15) return "ring-2 ring-amber-400/50";
  if (level >= 12) return "ring-2 ring-violet-400/40";
  if (level >= 8) return "ring-2 ring-yellow-400/30";
  if (level >= 5) return "ring-1 ring-slate-300/20";
  if (level >= 3) return "ring-1 ring-amber-600/20";
  if (level >= 1) return "ring-1 ring-yellow-300/15";
  return "";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LearningClicker() {
  const { user } = useAuth();
  const [state, setState] = useState<ClickerState>(DEFAULT_STATE);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"upgrades" | "pets" | "prestige">("upgrades");
  const [clickEffects, setClickEffects] = useState<{ id: number; x: number; y: number; value: number; isCrit: boolean }[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; angle: number }[]>([]);
  const [pulseRings, setPulseRings] = useState<{ id: number; color: string }[]>([]);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [buyFeedback, setBuyFeedback] = useState<string | null>(null);
  const [buttonGlow, setButtonGlow] = useState<"combo" | "golden" | null>(null);
  const [upgradesSubTab, setUpgradesSubTab] = useState<"klick" | "auto" | "speed" | "synergie">("klick");
  const [windowSize, setWindowSize] = useState({ w: 384, h: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [tooltipSkill, setTooltipSkill] = useState<string | null>(null);
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pet-System State
  const [allPets, setAllPets] = useState<PetDef[]>([]);
  const [boxTiers, setBoxTiers] = useState<Record<string, { cost: number }>>({});
  const [openingBox, setOpeningBox] = useState<string | null>(null);
  const [revealedPet, setRevealedPet] = useState<RevealedPet | null>(null);
  const [revealParticles, setRevealParticles] = useState<{ id: number; x: number; y: number; color: string; angle: number }[]>([]);

  // Prestige State
  const [showPrestigeConfirm, setShowPrestigeConfirm] = useState(false);
  const [prestigeAnimating, setPrestigeAnimating] = useState(false);
  const [prestigeParticles, setPrestigeParticles] = useState<{ angle: number; dist: number; color: string; size: number; delay: number; duration: number }[]>([]);

  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMovedRef = useRef(false);
  const dragHeaderRef = useRef<HTMLDivElement>(null);
  const clickIdRef = useRef(0);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const comboTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingPointsRef = useRef(0);
  const revealIdRef = useRef(0);

  // Prestige Multiplier
  const prestigeMultiplier = state.prestigeMultiplier || 1;

  // Pet Bonuses
  const petBonuses = getPetBonuses(state.ownedPets, state.activePet, state.activePets, state.petLevels);

  // Pet Slots: 1 base + petSlots prestige skill
  const maxPetSlots = 1 + (state.prestige_skill_petSlots || 0);

  // Gold Rush: 10s every 5 min
  const goldRushLevel = state.prestige_skill_goldRush || 0;
  const [goldRushActive, setGoldRushActive] = useState(false);
  const goldRushTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load pet definitions
  useEffect(() => {
    setAllPets(getPetDefs());
    setBoxTiers(getBoxTiers());
  }, []);

  // State aus Firebase laden (nur beim ersten Laden oder User-Wechsel)
  const loadedUidRef = useRef<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); loadedUidRef.current = null; return; }
    if (loadedUidRef.current === user.uid) return; // Bereits geladen — nicht erneut laden
    loadedUidRef.current = user.uid;
    setLoading(true);
    setLoadError(false);

    const loadWithRetry = async (retries = 2) => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const s = await loadClickerState(user.uid);
          setState(s);
          setLoading(false);
          setLoadError(false);
          return;
        } catch (err) {
          console.error(`[Clicker] Load attempt ${attempt + 1} failed:`, err);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
          }
        }
      }
      // Alle Versuche fehlgeschlagen
      setLoading(false);
      setLoadError(true);
    };

    loadWithRetry();
  }, [user?.uid]);

  // Auto-Tick: Punkte in Firebase speichern (alle 10 Sekunden)
  // WICHTIG: Überschreibt NICHT den lokalen State — nur speichern
  useEffect(() => {
    if (!user || state.autoAmount <= 0) return;
    tickIntervalRef.current = setInterval(async () => {
      const petAutoBonus = 1 + petBonuses.auto / 100;
      const effectiveAmount = Math.floor(state.autoAmount * prestigeMultiplier * petAutoBonus);
      // Speichern, aber NICHT den lokalen State überschreiben
      await saveClickerTick(user.uid, effectiveAmount, state.autoSpeed);
    }, 10_000);
    return () => { if (tickIntervalRef.current) clearInterval(tickIntervalRef.current); };
  }, [user, state.autoAmount, state.autoSpeed, prestigeMultiplier, petBonuses.auto]);

  // Cache bei jeder State-Änderung sofort speichern (localStorage)
  const cacheSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!user || loading) return;
    // Debounce: max alle 2 Sekunden speichern
    if (cacheSaveTimeoutRef.current) clearTimeout(cacheSaveTimeoutRef.current);
    cacheSaveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem("learnhub_clicker_cache_" + user.uid, JSON.stringify(state));
      } catch { /* quota exceeded */ }
    }, 2000);
    return () => { if (cacheSaveTimeoutRef.current) clearTimeout(cacheSaveTimeoutRef.current); };
  }, [user, state, loading]);

  // State bei Tab-Wechsel / Schließen speichern (nutzt Ref für aktuellen State)
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);
  useEffect(() => {
    if (!user) return;
    const saveNow = () => {
      const s = stateRef.current;
      try {
        localStorage.setItem("learnhub_clicker_cache_" + user.uid, JSON.stringify(s));
      } catch {}
      saveFullClickerState(user.uid, s);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") saveNow();
    };
    const handleBeforeUnload = () => saveNow();
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  // Periodischer Full-State-Sync (alle 60 Sekunden) — speichert ALLE Felder in Firestore
  useEffect(() => {
    if (!user) return;
    const syncInterval = setInterval(() => {
      saveFullClickerState(user.uid, state);
    }, 60_000);
    return () => clearInterval(syncInterval);
  }, [user, state]);

  // Lokaler Auto-Tick (alle 1 Sekunde)
  const autoUpgradeCount =
    (state.upgrades["auto1"] || 0) + (state.upgrades["auto2"] || 0) +
    (state.upgrades["auto3"] || 0) + (state.upgrades["auto4"] || 0) + (state.upgrades["auto5"] || 0);
  const clickUpgradeCount =
    (state.upgrades["click1"] || 0) + (state.upgrades["click2"] || 0) +
    (state.upgrades["click3"] || 0) + (state.upgrades["click4"] || 0) + (state.upgrades["click5"] || 0);
  const speedUpgradeCount =
    (state.upgrades["speed1"] || 0) + (state.upgrades["speed2"] || 0) +
    (state.upgrades["speed3"] || 0) + (state.upgrades["speed4"] || 0);
  const synUpgradeCount = (state.upgrades["syn1"] || 0) + (state.upgrades["syn2"] || 0) + (state.upgrades["syn3"] || 0);
  const syn1Count = state.upgrades["syn1"] || 0;
  const syn2Count = state.upgrades["syn2"] || 0;
  const syn3Count = state.upgrades["syn3"] || 0;
  const synergyClickBonus = syn1Count > 0 ? 1 + (autoUpgradeCount * 0.02 * syn1Count) : 1;
  const synergySpeedBonus = syn2Count > 0 ? Math.max(0.3, 1 - (clickUpgradeCount * 0.03 * syn2Count)) : 1;
  const syn3Bonus = syn3Count > 0 ? 1 + (state.prestigeLevel * 0.10 * syn3Count) : 1;
  const effectiveAutoSpeed = Math.max(100, Math.floor(state.autoSpeed * synergySpeedBonus * (1 - petBonuses.speed / 100)));

  useEffect(() => {
    if (state.autoAmount <= 0) return;
    const petAutoBonus = 1 + petBonuses.auto / 100;
    const interval = setInterval(() => {
      const effectiveAuto = Math.floor(state.autoAmount * prestigeMultiplier * petAutoBonus);
      setState((prev) => ({
        ...prev,
        points: prev.points + effectiveAuto,
        totalPoints: prev.totalPoints + effectiveAuto,
      }));
    }, effectiveAutoSpeed);
    return () => clearInterval(interval);
  }, [state.autoAmount, effectiveAutoSpeed, prestigeMultiplier, petBonuses.auto]);

  // Gold Rush: every 5 min, activate for 10s
  useEffect(() => {
    if (goldRushLevel <= 0) return;
    const interval = setInterval(() => {
      setGoldRushActive(true);
      setTimeout(() => setGoldRushActive(false), 10000);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [goldRushLevel]);

  // Drag handlers — erst nach 5px Bewegung aktivieren
  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    dragMovedRef.current = false;
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    const el = dragHeaderRef.current;
    if (el) el.setPointerCapture(e.pointerId);
    const startX = e.clientX;
    const startY = e.clientY;
    const onMove = (ev: PointerEvent) => {
      const dx = Math.abs(ev.clientX - startX);
      const dy = Math.abs(ev.clientY - startY);
      if (dx > 5 || dy > 5) {
        setIsDragging(true);
        dragMovedRef.current = true;
      }
      if (dragMovedRef.current) {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - 320, ev.clientX - dragOffset.current.x)),
          y: Math.max(0, Math.min(window.innerHeight - 60, ev.clientY - dragOffset.current.y)),
        });
      }
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setIsDragging(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [position]);

  const handleDragEnd = useCallback(() => { setIsDragging(false); }, []);
  const handleHeaderClick = useCallback((e: React.MouseEvent) => {
    // IMMER stoppen — Header-Klicks sollen NIE durchschlagen
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Resize handler
  const handleResizeStart = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = windowSize.w;
    const el = e.currentTarget as HTMLElement;
    if (el) el.setPointerCapture(e.pointerId);
    setIsResizing(true);
    const onMove = (ev: PointerEvent) => {
      const newW = Math.max(300, Math.min(600, startW + (ev.clientX - startX)));
      setWindowSize({ w: newW, h: 0 });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      setIsResizing(false);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [windowSize.w]);

  // Combo-System
  const getComboMultiplier = useCallback((c: number) => {
    if (c >= 30) return 10;
    if (c >= 20) return 5;
    if (c >= 12) return 3;
    if (c >= 6) return 2;
    return 1;
  }, []);

  const COMBO_COLORS = ["#F59E0B", "#EF4444", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981"];
  const GOLDEN_CHANCE = 0.08;
  const GOLDEN_MULTIPLIER = 5;

  // Click handler
  const handleClick = useCallback(async (e: React.MouseEvent) => {
    if (!user) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = clickIdRef.current++;
    const now = Date.now();

    const timeSinceLastClick = now - lastClickTime;
    const newCombo = timeSinceLastClick < 600 ? combo + 1 : 1;
    const comboMult = getComboMultiplier(newCombo);
    setCombo(newCombo);
    setLastClickTime(now);

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => setCombo(0), 1500);

    const isGolden = Math.random() < GOLDEN_CHANCE;
    const goldenMult = isGolden ? GOLDEN_MULTIPLIER : 1;
    const petClickBonus = 1 + petBonuses.click / 100;
    const critChance = (state.prestige_skill_critChance || 0) * 0.02;
    const isCrit = !isGolden && Math.random() < critChance;
    const critMult = isCrit ? 2 : 1;
    const goldRushMult = goldRushActive ? 2 : 1;
    const clickMasteryBonus = 1 + (state.prestige_skill_clickMastery || 0) * 0.05;

    const earnedPoints = Math.floor(
      state.clickPower * comboMult * goldenMult * critMult * goldRushMult * synergyClickBonus * prestigeMultiplier * petClickBonus * clickMasteryBonus * syn3Bonus
    );

    setState((prev) => ({
      ...prev,
      points: prev.points + earnedPoints,
      totalPoints: prev.totalPoints + earnedPoints,
    }));

    setClickEffects((prev) => [...prev, { id, x, y, value: earnedPoints, isCrit }]);
    setTimeout(() => { setClickEffects((prev) => prev.filter((c) => c.id !== id)); }, 1200);

    const particleCount = isGolden ? 16 : isCrit ? 10 : Math.min(3 + comboMult * 2, 12);
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: id * 100 + i,
      x, y,
      color: isGolden ? "#FFD700" : isCrit ? "#EF4444" : COMBO_COLORS[Math.floor(Math.random() * COMBO_COLORS.length)],
      angle: (360 / particleCount) * i + Math.random() * 20,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find(np => np.id === p.id)));
    }, 800);

    // Pulse-Ringe hinter dem Cookie
    const ringColor = isGolden ? "rgba(255,215,0,0.4)" : isCrit ? "rgba(239,68,68,0.4)" : combo >= 12 ? "rgba(244,63,94,0.3)" : "rgba(250,204,21,0.2)";
    const ringId = id;
    setPulseRings((prev) => [...prev, { id: ringId, color: ringColor }]);
    setTimeout(() => { setPulseRings((prev) => prev.filter((r) => r.id !== ringId)); }, 800);

    if (newCombo >= 15 || isGolden) {
      setButtonGlow(isGolden ? "golden" : "combo");
      setTimeout(() => setButtonGlow(null), 400);
    }

    pendingPointsRef.current += earnedPoints;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      if (pendingPointsRef.current > 0) {
        await saveClickerClick(user.uid, pendingPointsRef.current);
        pendingPointsRef.current = 0;
      }
    }, 2000);
  }, [user, state.clickPower, combo, lastClickTime, getComboMultiplier, synergyClickBonus, prestigeMultiplier, petBonuses.click]);

  // Pending Clicks speichern
  const flushPendingClicks = useCallback(async () => {
    if (!user) return;
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = null;
    }
    if (pendingPointsRef.current > 0) {
      await saveClickerClick(user.uid, pendingPointsRef.current);
      pendingPointsRef.current = 0;
    }
  }, [user]);

  // Upgrade kaufen — Optimistic UI (sofort, Firebase asynchron)
  const handleBuyUpgrade = useCallback(async (upgrade: Upgrade, e?: React.MouseEvent) => {
    if (!user) return;
    const buyMax = e?.shiftKey ?? false;

    // State-Update über funktionales setState (kein Stale-Closure)
    setState((prev) => {
      const count = prev.upgrades[upgrade.id] || 0;
      let quantity = 1;
      let totalCost = getUpgradeCost(upgrade, count);

      if (buyMax) {
        // Berechne wie viele Levels mit aktuellen Punkten kaufbar sind
        let c = count;
        let cost = 0;
        while (cost + getUpgradeCost(upgrade, c) <= prev.points) {
          cost += getUpgradeCost(upgrade, c);
          c++;
        }
        quantity = c - count;
        totalCost = cost;
      }

      if (prev.points < totalCost || quantity <= 0) return prev;

      let newClickPower = prev.clickPower;
      let newAutoAmount = prev.autoAmount;
      let newAutoSpeed = prev.autoSpeed;
      if (upgrade.effect === "clickPower") newClickPower += upgrade.value * quantity;
      else if (upgrade.effect === "autoAmount") newAutoAmount += upgrade.value * quantity;
      else if (upgrade.effect === "autoSpeed") {
        for (let i = 0; i < quantity; i++) newAutoSpeed = Math.max(100, Math.floor(newAutoSpeed * upgrade.value));
      }

      // Feedback
      setBuyFeedback(upgrade.id);
      setTimeout(() => setBuyFeedback(null), 300);

      // Firebase asynchron — Upgrade + Full-State-Cache
      flushPendingClicks().then(async () => {
        await buyClickerUpgradeBulk(user.uid, upgrade.id, quantity);
      });

      return {
        ...prev,
        points: prev.points - totalCost,
        clickPower: newClickPower,
        autoAmount: newAutoAmount,
        autoSpeed: newAutoSpeed,
        upgrades: { ...prev.upgrades, [upgrade.id]: count + quantity },
      };
    });
  }, [user, flushPendingClicks]);

  // Pet-Box öffnen
  const handleOpenBox = useCallback(async (boxType: string) => {
    if (!user || openingBox) return;
    await flushPendingClicks();
    setOpeningBox(boxType);

    // Shake-Animation starten
    setTimeout(async () => {
      const result = await openPetBox(user.uid, boxType);
      if (result) {
        setState(result.state);
        // Full State nach Box-Öffnung speichern
        saveFullClickerState(user.uid, result.state);
        const revealId = revealIdRef.current++;
        setRevealedPet({ pet: result.pet, id: revealId });

        // Partikel-Explosion
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: revealId * 100 + i,
          x: 50 + Math.random() * 100,
          y: 50 + Math.random() * 50,
          color: RARITY_COLORS[result.pet.rarity]?.text.includes("amber") ? "#FFD700"
            : RARITY_COLORS[result.pet.rarity]?.text.includes("violet") ? "#A78BFA"
            : RARITY_COLORS[result.pet.rarity]?.text.includes("blue") ? "#60A5FA"
            : "#94A3B8",
          angle: (360 / 20) * i + Math.random() * 30,
        }));
        setRevealParticles(newParticles);
        setTimeout(() => setRevealParticles([]), 1500);

        // Reveal nach 3 Sekunden ausblenden
        setTimeout(() => setRevealedPet(null), 3000);
      }
      setOpeningBox(null);
    }, 800);
  }, [user, openingBox, flushPendingClicks]);

  // Pet ausrüsten (begrenzt auf maxPetSlots)
  const handleEquipPet = useCallback(async (petId: string) => {
    if (!user) return;
    const isEquipped = state.activePets.includes(petId);
    if (!isEquipped && state.activePets.length >= maxPetSlots) return; // Slot-Limit erreicht
    const newState = await equipPet(user.uid, petId);
    if (newState) {
      setState(newState);
      saveFullClickerState(user.uid, newState);
    }
  }, [user, state.activePets, maxPetSlots]);

  // Pet upgraden
  const handleUpgradePet = useCallback(async (petId: string) => {
    if (!user) return;
    const newState = await upgradePet(user.uid, petId);
    if (newState) {
      setState(newState);
      saveFullClickerState(user.uid, newState);
    }
  }, [user]);

  // Tooltip mit 1.5s Delay
  const handleTooltipEnter = useCallback((skillId: string) => {
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    tooltipTimerRef.current = setTimeout(() => setTooltipSkill(skillId), 1500);
  }, []);
  const handleTooltipLeave = useCallback(() => {
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    setTooltipSkill(null);
  }, []);

  // Prestige
  const handlePrestige = useCallback(async () => {
    if (!user) return;
    await flushPendingClicks();

    // Pre-generate particles before animation starts
    const colors = ["#F43F5E", "#FB923C", "#FBBF24", "#A78BFA", "#60A5FA", "#34D399"];
    setPrestigeParticles(Array.from({ length: 50 }, (_, i) => ({
      angle: (360 / 50) * i,
      dist: 150 + Math.random() * 300,
      color: colors[i % colors.length],
      size: 2 + Math.random() * 4,
      delay: 0.1 + Math.random() * 0.3,
      duration: 1.2 + Math.random() * 1,
    })));

    setPrestigeAnimating(true);
    setShowPrestigeConfirm(false);

    // Glitch-Animation
    setTimeout(async () => {
      const newState = await prestigeClickerState(user.uid);
      if (newState) {
        setState(newState);
        // Full State nach Prestige speichern
        saveFullClickerState(user.uid, newState);
      }
      setTimeout(() => setPrestigeAnimating(false), 1500);
    }, 1000);
  }, [user, flushPendingClicks]);

  // Reset
  const handleReset = useCallback(async () => {
    if (!user) return;
    await resetClickerState(user.uid);
    setState(DEFAULT_STATE);
    // Cache leeren
    try { localStorage.removeItem("learnhub_clicker_cache_" + user.uid); } catch {}
  }, [user]);

  // Computed values
  const comboMultiplier = getComboMultiplier(combo);
  const petAutoBonus = 1 + petBonuses.auto / 100;
  const pointsPerSecond = state.autoAmount > 0
    ? (state.autoAmount * prestigeMultiplier * petAutoBonus / effectiveAutoSpeed) * 1000
    : 0;

  const nextMilestone = MILESTONES.find(m => state.totalPoints < m.points) || MILESTONES[MILESTONES.length - 1];
  const prevMilestonePoints = MILESTONES.filter(m => m.points <= state.totalPoints).pop()?.points ?? 0;
  const milestoneProgress = Math.min(1, (state.totalPoints - prevMilestonePoints) / (nextMilestone.points - prevMilestonePoints));

  // Prestige info
  const prestigePointsToGain = state.totalPoints >= 10000
    ? Math.floor(Math.log10(state.totalPoints / 10000))
    : 0;
  const prestigeRanks = [
    { lvl: 1, icon: "⭐", name: "Stern" },
    { lvl: 3, icon: "🥉", name: "Bronze" },
    { lvl: 5, icon: "🥈", name: "Silber" },
    { lvl: 8, icon: "🥇", name: "Gold" },
    { lvl: 12, icon: "💎", name: "Diamant" },
    { lvl: 15, icon: "👑", name: "Legendär" },
    { lvl: 20, icon: "🌌", name: "Kosmisch" },
    { lvl: 25, icon: "🔮", name: "Omniscient" },
    { lvl: 30, icon: "☀️", name: "Göttlich" },
  ];
  const nextRank = prestigeRanks.find(r => r.lvl > state.prestigeLevel);
  const canPrestige = state.totalPoints >= 10000;

  if (!user) return null;

  // Floating button (when closed)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-amber-500/30 flex items-center justify-center transition-all hover:scale-110 group ${getPrestigeRing(state.prestigeLevel)}`}
        title="Lern-Clicker öffnen"
      >
        <span className={`text-2xl ${getPrestigeGlow(state.prestigeLevel)}`}>
          {getPrestigeAvatar(state.prestigeLevel, "🎓")}
        </span>
        {state.totalPoints > 0 && (
          <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-slate-900 rounded-full text-[10px] font-bold text-amber-400 border border-amber-500/30">
            {formatNumber(state.points)}
          </div>
        )}
        {state.prestigeLevel > 0 && (
          <div className="absolute -bottom-1 -right-1 px-1 py-0.5 bg-rose-900 rounded-full text-[8px] font-bold text-rose-300 border border-rose-500/30">
            P{state.prestigeLevel}
          </div>
        )}
      </button>
    );
  }

  return (
    <>
      {/* Prestige Glitch Overlay — full screen */}
      {prestigeAnimating && (
        <div className="fixed inset-0 z-[100] pointer-events-none prestige-glitch-overlay">
          {/* Dark backdrop with pulse */}
          <div className="absolute inset-0 bg-black/85" />
          {/* Scanline glitch strips */}
          <div className="absolute inset-0 prestige-scanlines" />
          {/* Glitch color bars */}
          <div className="absolute inset-0 prestige-color-bars opacity-20" />
          {/* Central text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-violet-400 prestige-glitch-text drop-shadow-2xl tracking-wider">
              PRESTIGE
            </div>
            <div className="text-5xl sm:text-6xl font-black text-white/90 prestige-level-pop drop-shadow-2xl">
              {state.prestigeLevel + 1}
            </div>
            <div className="text-sm text-slate-400 mt-2 prestige-subtitle tracking-widest uppercase">
              Fortschritt zurückgesetzt
            </div>
          </div>
          {/* Prestige Particles — radial burst from center */}
          {prestigeParticles.map((p, i) => (
            <div
              key={`pp-${i}`}
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                animation: `prestige-radial ${p.duration}s ease-out forwards`,
                animationDelay: `${p.delay}s`,
                // @ts-ignore
                "--pp-angle": `${p.angle}deg`,
                "--pp-dist": `${p.dist}px`,
              }}
            />
          ))}
          {/* Sparkle ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-rose-500/40 animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full border border-violet-500/20 prestige-expand-ring" />
          </div>
        </div>
      )}

      {/* Pet Reveal Overlay — centered on screen */}
      {revealedPet && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center cursor-pointer"
          onClick={() => setRevealedPet(null)}
        >
          {/* Dark backdrop with blur */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" />
          <div className="relative flex flex-col items-center gap-4 animate-bounce-in" onClick={(e) => e.stopPropagation()}>
            {/* Box-opening shake phase */}
            <div className="relative">
              {/* Rarity Glow ring */}
              <div className={`absolute -inset-12 rounded-full blur-3xl opacity-50 ${
                revealedPet.pet.rarity === "legendary" ? "bg-amber-500/50"
                : revealedPet.pet.rarity === "epic" ? "bg-violet-500/50"
                : revealedPet.pet.rarity === "rare" ? "bg-blue-500/50"
                : "bg-slate-500/30"
              }`} />
              {/* Spinning emoji */}
              <div className="text-8xl relative z-10 animate-spin-slow drop-shadow-2xl">{revealedPet.pet.emoji}</div>
              {/* Outer ring pulse */}
              <div className={`absolute -inset-4 rounded-full border-2 opacity-40 animate-ping ${
                revealedPet.pet.rarity === "legendary" ? "border-amber-400"
                : revealedPet.pet.rarity === "epic" ? "border-violet-400"
                : revealedPet.pet.rarity === "rare" ? "border-blue-400"
                : "border-slate-400"
              }`} />
            </div>
            <div className={`text-2xl font-black relative z-10 ${RARITY_COLORS[revealedPet.pet.rarity].text} drop-shadow-lg`}>
              {revealedPet.pet.name}
            </div>
            <div className="text-sm text-slate-200 relative z-10 font-medium">{revealedPet.pet.bonus}</div>
            <div className={`text-xs font-bold px-3 py-1 rounded-full ${RARITY_COLORS[revealedPet.pet.rarity].bg} ${RARITY_COLORS[revealedPet.pet.rarity].text} ${RARITY_COLORS[revealedPet.pet.rarity].border} border relative z-10 tracking-wider`}>
              {revealedPet.pet.rarity.toUpperCase()}
            </div>
            {/* Reveal Particles */}
            {revealParticles.map((p) => (
              <div
                key={p.id}
                className="absolute w-3 h-3 rounded-full pointer-events-none z-20"
                style={{
                  left: `${p.x}px`,
                  top: `${p.y}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 12px ${p.color}`,
                  animation: "particle-burst 1.2s ease-out forwards",
                  // @ts-ignore
                  "--angle": `${p.angle}deg`,
                  "--dist": `${80 + Math.random() * 80}px`,
                }}
              />
            ))}
            {/* Click hint */}
            <div className="text-[11px] text-slate-500 relative z-10 mt-2 animate-pulse">Klicken zum Schließen</div>
          </div>
        </div>
      )}

      {/* Window */}
      <div
        className="fixed z-50 select-none pointer-events-auto"
        style={{ left: position.x, top: position.y, width: windowSize.w, isolation: "isolate" }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <div
          className={`rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 overflow-hidden pointer-events-auto ${prestigeAnimating ? "animate-pulse" : ""}`}
          style={{ background: "rgb(15, 23, 42)" }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            ref={dragHeaderRef}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-b border-slate-700/50 cursor-grab active:cursor-grabbing touch-none"
            style={{ touchAction: "none" }}
            onPointerDown={handleDragStart}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
            onClick={handleHeaderClick}
          >
            <GripVertical className="w-4 h-4 text-slate-500" />
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-lg">{getPrestigeAvatar(state.prestigeLevel, state.equippedAvatar)}</span>
              <span className="text-sm font-bold text-amber-400 truncate">Lern-Clicker</span>
              {prestigeMultiplier > 1 && (
                <span className="px-1 py-0.5 bg-rose-500/20 border border-rose-500/40 rounded text-[8px] font-bold text-rose-300 whitespace-nowrap">
                  x{prestigeMultiplier.toFixed(prestigeMultiplier % 1 === 0 ? 0 : 2)}
                </span>
              )}
              {state.prestigeLevel > 0 && (
                <span className="px-1 py-0.5 bg-violet-500/20 border border-violet-500/40 rounded text-[8px] font-bold text-violet-300 whitespace-nowrap">
                  P{state.prestigeLevel}
                </span>
              )}
            </div>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            >
              {isMinimized ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="p-1 hover:bg-slate-700/50 rounded transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {!isMinimized && !loading && (
            <>
              {/* Points display */}
              <div className="p-3 text-center">
                <div
                  className="text-2xl font-black text-white mb-0.5 tabular-nums tracking-tight"
                  style={{ textShadow: combo >= 12 ? "0 0 20px rgba(250,204,21,0.3)" : "none" }}
                >
                  {formatNumber(state.points)}
                </div>
                <div className="text-[12px] text-slate-500 tabular-nums">
                  {formatNumber(state.totalPoints)} Gesamt
                  {pointsPerSecond > 0 && (
                    <span className="text-amber-500/80"> · {formatNumber(pointsPerSecond)}/s</span>
                  )}
                  {state.prestigePoints > 0 && (
                    <span className="text-violet-400 ml-1">· {state.prestigePoints} PP</span>
                  )}
                  {goldRushActive && (
                    <span className="text-yellow-400 ml-1 animate-pulse">· 💰 2x Rush!</span>
                  )}
                </div>

                {/* Click area — komplett isoliert */}
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleClick(e); }}
                  onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onTouchStart={(e) => { e.stopPropagation(); e.preventDefault(); }}
                  onPointerDown={(e) => { e.stopPropagation(); }}
                  style={{ touchAction: "manipulation" }}
                  className={`relative mt-2 w-24 h-24 mx-auto rounded-full border-2 flex items-center justify-center group active:scale-[0.85] transition-transform duration-75 ${
                    combo >= 30
                      ? "bg-gradient-to-br from-violet-500/50 to-fuchsia-500/50 border-violet-300/70 shadow-xl shadow-violet-500/40"
                      : combo >= 20
                      ? "bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 border-violet-400/60 shadow-lg shadow-violet-500/30"
                      : combo >= 12
                      ? "bg-gradient-to-br from-red-500/35 to-orange-500/35 border-red-400/50 shadow-md shadow-red-500/20"
                      : combo >= 6
                      ? "bg-gradient-to-br from-amber-500/35 to-orange-500/35 border-amber-400/50 shadow-md shadow-amber-500/15"
                      : "bg-gradient-to-br from-amber-500/25 to-orange-500/25 border-amber-500/40 hover:border-amber-400/60"
                  } ${buttonGlow === "golden" ? "animate-click-glow-golden" : buttonGlow === "combo" ? "animate-click-glow" : ""}`}
                >
                  {pulseRings.map((ring) => (
                    <div
                      key={ring.id}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none z-0"
                      style={{
                        border: `2px solid ${ring.color}`,
                        animation: "clickPulseRing 0.8s ease-out forwards",
                      }}
                    />
                  ))}
                  {combo >= 6 && (
                    <div className={`absolute -inset-2 rounded-full animate-pulse opacity-60 ${
                      combo >= 30 ? "bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-md" :
                      combo >= 20 ? "bg-gradient-to-r from-purple-500/25 to-pink-500/25 blur-md" :
                      combo >= 12 ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-sm" :
                      "bg-gradient-to-r from-amber-500/15 to-orange-500/15 blur-sm"
                    }`} />
                  )}
                  {combo >= 12 && (
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-30 ${
                      combo >= 30 ? "bg-violet-400" : combo >= 20 ? "bg-purple-400" : "bg-red-400"
                    }`} />
                  )}
                  <span className={`text-3xl relative z-10 transition-transform duration-75 ${
                    combo >= 20 ? "scale-110" : combo >= 12 ? "scale-105" : "group-active:scale-90"
                  } ${getPrestigeGlow(state.prestigeLevel)} ${getPrestigeRing(state.prestigeLevel)} rounded-full`}>
                    {getPrestigeAvatar(state.prestigeLevel, state.equippedAvatar)}
                  </span>

                  {/* Floating numbers */}
                  {clickEffects.map((effect) => {
                    const isBig = effect.value >= state.clickPower * 3;
                    return (
                      <div
                        key={effect.id}
                        className={`absolute pointer-events-none z-20 font-black ${
                          effect.isCrit ? "text-lg text-red-400" :
                          goldRushActive ? "text-lg text-yellow-300" :
                          isBig ? "text-lg text-yellow-300" : "text-sm text-amber-400"
                        }`}
                        style={{
                          left: effect.x,
                          top: effect.y,
                          animation: (isBig || effect.isCrit || goldRushActive) ? "floatUpBig 1.2s ease-out forwards" : "floatUp 1s ease-out forwards",
                          textShadow: effect.isCrit ? "0 0 12px rgba(239,68,68,0.7)" : goldRushActive ? "0 0 14px rgba(250,204,21,0.6)" : isBig ? "0 0 10px rgba(250,204,21,0.5)" : "none",
                        }}
                      >
                        {effect.isCrit ? `💥+${effect.value}` : goldRushActive ? `💰+${effect.value}` : `+${effect.value}`}
                      </div>
                    );
                  })}

                  {/* Partikel */}
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full pointer-events-none z-10"
                      style={{
                        left: p.x,
                        top: p.y,
                        backgroundColor: p.color,
                        boxShadow: `0 0 6px ${p.color}`,
                        animation: "particle-burst 0.7s ease-out forwards",
                        // @ts-ignore
                        "--angle": `${p.angle}deg`,
                        "--dist": `${35 + Math.random() * 35}px`,
                      }}
                    />
                  ))}
                </button>

                {/* Aktive Pets — links und rechts neben dem Cookie */}
                {state.activePets.length > 0 && (
                  <div className="flex justify-center items-center gap-1 mt-1 pointer-events-none" style={{ zIndex: 10 }}>
                    {state.activePets.slice(0, 4).map((petId) => {
                      const petDef = allPets.find((p) => p.id === petId);
                      if (!petDef) return null;
                      const rarity = petDef.rarity;
                      const level = state.petLevels[petId] || 1;
                      return (
                        <div key={petId} className="flex flex-col items-center">
                          <span className={`text-lg pet-idle-bounce ${
                            rarity === "legendary" ? "drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" :
                            rarity === "epic" ? "drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]" :
                            rarity === "rare" ? "drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]" :
                            ""
                          }`}>
                            {petDef.emoji}
                          </span>
                          {level > 1 && (
                            <span className="text-[7px] font-bold text-amber-400/70">Lv.{level}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Combo-Anzeige */}
                {combo >= 3 && (
                  <>
                    <div className={`mt-1.5 flex items-center justify-center gap-1.5 font-bold transition-all ${
                      combo >= 30 ? "text-violet-300 text-sm" :
                      combo >= 20 ? "text-violet-400 text-xs" :
                      combo >= 12 ? "text-red-400 text-xs" :
                      "text-amber-400 text-xs"
                    }`}>
                      <Flame className={`w-4 h-4 ${combo >= 20 ? "animate-bounce" : "animate-pulse"}`} />
                      <span>x{comboMultiplier}</span>
                      <span className="text-slate-500">· {combo} Hits</span>
                      {combo >= 12 && <span className="animate-pulse">🔥</span>}
                      {combo >= 30 && <span className="animate-bounce">⚡</span>}
                    </div>
                    {/* Combo-Timer Bar */}
                    <div className="mt-1 mx-8 h-0.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                        style={{
                          animation: "comboTimerShrink 0.6s linear forwards",
                        }}
                      />
                    </div>
                  </>
                )}

                <div className="mt-1 text-[12px] text-slate-500">
                  +{Math.floor(state.clickPower * synergyClickBonus * prestigeMultiplier * (1 + petBonuses.click / 100) * syn3Bonus)}{comboMultiplier > 1 ? ` x${comboMultiplier}` : ""} pro Klick
                  {synergyClickBonus > 1 && <span className="text-purple-400 ml-1">(+{Math.round((synergyClickBonus - 1) * 100)}%)</span>}
                  {prestigeMultiplier > 1 && <span className="text-rose-400 ml-1">(+{Math.round((prestigeMultiplier - 1) * 100)}%)</span>}
                  {petBonuses.click > 0 && <span className="text-emerald-400 ml-1">(+{petBonuses.click}% Pet)</span>}
                </div>

                {/* Mini Milestone-Bar */}
                <div className="mt-1.5 px-2">
                  <div className="h-1 bg-slate-700/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                      style={{ width: `${milestoneProgress * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mt-0.5">
                    <span>{nextMilestone.icon} {nextMilestone.label}</span>
                    <span>{formatNumber(state.totalPoints)}/{formatNumber(nextMilestone.points)}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-t border-slate-700/50">
                <button
                  onClick={() => setActiveTab("upgrades")}
                  className={`flex-1 py-1.5 text-[12px] font-medium transition-colors ${activeTab === "upgrades" ? "text-amber-400 border-b-2 border-amber-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Zap className="w-3.5 h-3.5 inline mr-1" /> Upgrades
                </button>
                <button
                  onClick={() => setActiveTab("pets")}
                  className={`flex-1 py-1.5 text-[12px] font-medium transition-colors ${activeTab === "pets" ? "text-emerald-400 border-b-2 border-emerald-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <PawPrint className="w-3.5 h-3.5 inline mr-1" /> Pets
                </button>
                <button
                  onClick={() => setActiveTab("prestige")}
                  className={`flex-1 py-1.5 text-[12px] font-medium transition-colors ${activeTab === "prestige" ? "text-rose-400 border-b-2 border-rose-400" : "text-slate-500 hover:text-slate-300"}`}
                >
                  <Crown className="w-3.5 h-3.5 inline mr-1" /> Prestige
                </button>
              </div>

              {/* Upgrade Sub-Categories — fest über dem Scroll-Bereich */}
              {activeTab === "upgrades" && (
                <div className="px-2 pt-1.5 pb-1 border-b border-slate-700/30">
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { key: "klick" as const, icon: "👆", label: "Klick", levelSum: clickUpgradeCount,
                        activeBg: "bg-amber-500/15", activeBorder: "border-amber-500/40", activeShadow: "shadow-amber-500/10",
                        activeText: "text-amber-400", activeBadge: "bg-amber-500/20 text-amber-300" },
                      { key: "auto" as const, icon: "🤖", label: "Auto", levelSum: autoUpgradeCount,
                        activeBg: "bg-emerald-500/15", activeBorder: "border-emerald-500/40", activeShadow: "shadow-emerald-500/10",
                        activeText: "text-emerald-400", activeBadge: "bg-emerald-500/20 text-emerald-300" },
                      { key: "speed" as const, icon: "⚡", label: "Speed", levelSum: speedUpgradeCount,
                        activeBg: "bg-blue-500/15", activeBorder: "border-blue-500/40", activeShadow: "shadow-blue-500/10",
                        activeText: "text-blue-400", activeBadge: "bg-blue-500/20 text-blue-300" },
                      { key: "synergie" as const, icon: "🔗", label: "Synergie", levelSum: synUpgradeCount,
                        activeBg: "bg-purple-500/15", activeBorder: "border-purple-500/40", activeShadow: "shadow-purple-500/10",
                        activeText: "text-purple-400", activeBadge: "bg-purple-500/20 text-purple-300" },
                    ].map((cat) => {
                      const isActive = upgradesSubTab === cat.key;
                      return (
                        <button
                          key={cat.key}
                          onClick={() => setUpgradesSubTab(cat.key)}
                          className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-lg border transition-all text-center ${
                            isActive
                              ? `${cat.activeBg} ${cat.activeBorder} shadow-sm ${cat.activeShadow}`
                              : "bg-slate-800/20 border-slate-700/20 hover:border-slate-600/40"
                          }`}
                        >
                          <span className="text-base leading-none">{cat.icon}</span>
                          <span className={`text-[10px] font-bold ${isActive ? cat.activeText : "text-slate-500"}`}>{cat.label}</span>
                          {cat.levelSum > 0 && (
                            <span className={`text-[8px] font-bold px-1 rounded-full ${isActive ? cat.activeBadge : "bg-slate-700/40 text-slate-500"}`}>
                              Lv.{cat.levelSum}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {/* Buy-Max: Shift+Click */}
                </div>
              )}

              {/* Content */}
              <div className="max-h-72 overflow-y-auto px-2 pb-2">

                {/* ════ UPGRADES TAB ════ */}
                {activeTab === "upgrades" && (
                  <div>
                    {/* Klick-Upgrades */}
                    {upgradesSubTab === "klick" && (
                      <div className="grid grid-cols-2 gap-1.5">
                        {CLICK_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;
                          const nextCost = getUpgradeCost(upgrade, count + 1);
                          const progressToNext = Math.min(1, state.points / nextCost);

                          return (
                            <button
                              key={upgrade.id}
                              onClick={(e) => handleBuyUpgrade(upgrade, e)}
                              disabled={!canAfford}
                              className={`relative text-left p-2.5 rounded-xl border transition-all active:scale-95 overflow-hidden ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40 shadow-sm shadow-green-500/20"
                                  : canAfford
                                  ? "bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30 hover:border-amber-400/60 hover:from-amber-500/15 hover:to-orange-500/10 hover:scale-[1.02] shadow-sm shadow-amber-500/10"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-40"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-xl animate-pulse pointer-events-none" />
                              )}
                              {/* Glow backdrop for affordable */}
                              {canAfford && !isFeedback && (
                                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-amber-500/10 blur-lg pointer-events-none" />
                              )}
                              <div className="flex items-start justify-between mb-1 relative z-10">
                                <span className="text-2xl leading-none drop-shadow-sm">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/20">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-bold text-white truncate mb-0.5 relative z-10">
                                {upgrade.name}
                              </div>
                              <div className="text-[9px] text-slate-400 truncate mb-1 relative z-10">
                                {upgrade.description}
                              </div>
                              <div className={`text-[11px] font-bold relative z-10 ${canAfford ? "text-amber-400" : "text-slate-600"}`}>
                                {formatNumber(cost)}
                              </div>
                              {count > 0 && (
                                <div className="mt-1.5 h-1 bg-slate-700/40 rounded-full overflow-hidden relative z-10">
                                  <div
                                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-300"
                                    style={{ width: `${progressToNext * 100}%` }}
                                  />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Auto-Upgrades */}
                    {upgradesSubTab === "auto" && (
                      <div className="grid grid-cols-2 gap-1.5">
                        {AUTO_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;
                          const nextCost = getUpgradeCost(upgrade, count + 1);
                          const progressToNext = Math.min(1, state.points / nextCost);

                          return (
                            <button
                              key={upgrade.id}
                              onClick={(e) => handleBuyUpgrade(upgrade, e)}
                              disabled={!canAfford}
                              className={`relative text-left p-2.5 rounded-xl border transition-all active:scale-95 overflow-hidden ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40 shadow-sm shadow-green-500/20"
                                  : canAfford
                                  ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/30 hover:border-emerald-400/60 hover:from-emerald-500/15 hover:to-teal-500/10 hover:scale-[1.02] shadow-sm shadow-emerald-500/10"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-40"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-xl animate-pulse pointer-events-none" />
                              )}
                              {canAfford && !isFeedback && (
                                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-emerald-500/10 blur-lg pointer-events-none" />
                              )}
                              <div className="flex items-start justify-between mb-1 relative z-10">
                                <span className="text-2xl leading-none drop-shadow-sm">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/20">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-bold text-white truncate mb-0.5 relative z-10">{upgrade.name}</div>
                              <div className="text-[9px] text-slate-400 truncate mb-1 relative z-10">{upgrade.description}</div>
                              <div className={`text-[11px] font-bold relative z-10 ${canAfford ? "text-emerald-400" : "text-slate-600"}`}>{formatNumber(cost)}</div>
                              {count > 0 && (
                                <div className="mt-1.5 h-1 bg-slate-700/40 rounded-full overflow-hidden relative z-10">
                                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300" style={{ width: `${progressToNext * 100}%` }} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Speed */}
                    {upgradesSubTab === "speed" && (
                      <div className="grid grid-cols-2 gap-1.5">
                        {SPEED_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;

                          return (
                            <button
                              key={upgrade.id}
                              onClick={(e) => handleBuyUpgrade(upgrade, e)}
                              disabled={!canAfford}
                              className={`relative text-left p-2.5 rounded-xl border transition-all active:scale-95 overflow-hidden ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40 shadow-sm shadow-green-500/20"
                                  : canAfford
                                  ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/30 hover:border-blue-400/60 hover:from-blue-500/15 hover:to-cyan-500/10 hover:scale-[1.02] shadow-sm shadow-blue-500/10"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-40"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-xl animate-pulse pointer-events-none" />
                              )}
                              {canAfford && !isFeedback && (
                                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-blue-500/10 blur-lg pointer-events-none" />
                              )}
                              <div className="flex items-start justify-between mb-1 relative z-10">
                                <span className="text-2xl leading-none drop-shadow-sm">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/20">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-bold text-white truncate mb-0.5 relative z-10">{upgrade.name}</div>
                              <div className="text-[9px] text-slate-400 truncate mb-1 relative z-10">{upgrade.description}</div>
                              <div className={`text-[11px] font-bold relative z-10 ${canAfford ? "text-blue-400" : "text-slate-600"}`}>{formatNumber(cost)}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Synergie */}
                    {upgradesSubTab === "synergie" && (
                      <div className="grid grid-cols-2 gap-1.5">
                        {SYN_UPGRADES.map((upgrade) => {
                          const count = state.upgrades[upgrade.id] || 0;
                          const cost = getUpgradeCost(upgrade, count);
                          const canAfford = state.points >= cost;
                          const isFeedback = buyFeedback === upgrade.id;

                          return (
                            <button
                              key={upgrade.id}
                              onClick={(e) => handleBuyUpgrade(upgrade, e)}
                              disabled={!canAfford}
                              className={`relative text-left p-2.5 rounded-xl border transition-all active:scale-95 overflow-hidden ${
                                isFeedback
                                  ? "bg-green-500/15 border-green-500/40 shadow-sm shadow-green-500/20"
                                  : canAfford
                                  ? "bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 border-purple-500/30 hover:border-purple-400/60 hover:from-purple-500/15 hover:to-fuchsia-500/10 hover:scale-[1.02] shadow-sm shadow-purple-500/10"
                                  : "bg-slate-800/20 border-slate-700/20 opacity-40"
                              }`}
                            >
                              {isFeedback && (
                                <div className="absolute inset-0 bg-green-400/10 rounded-xl animate-pulse pointer-events-none" />
                              )}
                              {canAfford && !isFeedback && (
                                <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-purple-500/10 blur-lg pointer-events-none" />
                              )}
                              <div className="flex items-start justify-between mb-1 relative z-10">
                                <span className="text-2xl leading-none drop-shadow-sm">{upgrade.icon}</span>
                                {count > 0 && (
                                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/20">
                                    Lv.{count}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] font-bold text-white truncate mb-0.5 relative z-10">{upgrade.name}</div>
                              <div className="text-[9px] text-slate-400 truncate mb-1 relative z-10">{upgrade.description}</div>
                              <div className={`text-[11px] font-bold relative z-10 ${canAfford ? "text-purple-400" : "text-slate-600"}`}>{formatNumber(cost)}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ════ PETS TAB ════ */}
                {activeTab === "pets" && (
                  <div className="space-y-3">
                    {/* Aktive Pets */}
                    {state.activePets.length > 0 ? (() => {
                      return (
                        <div className={`p-3 rounded-xl border border-slate-700/30 bg-slate-800/20 relative overflow-hidden`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[12px] font-bold text-slate-400">Aktive Pets</span>
                            <span className="text-[9px] text-slate-500">{state.activePets.length}/{maxPetSlots} Slots</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {state.activePets.map((petId) => {
                              const petDef = allPets.find((p) => p.id === petId);
                              if (!petDef) return null;
                              const colors = RARITY_COLORS[petDef.rarity];
                              const level = state.petLevels[petId] || 1;
                              return (
                                <div key={petId} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg ${colors.bg} ${colors.border} border`}>
                                  <span className="text-xl">{petDef.emoji}</span>
                                  <div>
                                    <div className={`text-[11px] font-black ${colors.text}`}>{petDef.name}</div>
                                    <div className="text-[9px] text-emerald-400 font-bold">+{petDef.bonusPercent * level}% {petDef.bonusType}</div>
                                  </div>
                                  <span className="text-[8px] font-bold text-amber-400/70 ml-auto">Lv.{level}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })() : (
                      <div className="p-3 rounded-xl border border-slate-700/30 bg-slate-800/20 text-center">
                        <div className="text-[12px] text-slate-500">Kein Pet aktiv</div>
                        <div className="text-[10px] text-slate-600">Klicke auf ein Pet in deiner Sammlung!</div>
                        <div className="text-[9px] text-slate-600 mt-1">Slots: {state.activePets.length}/{maxPetSlots}</div>
                      </div>
                    )}

                    {/* Kisten — 3D Style */}
                    <div>
                      <div className="text-[12px] font-bold text-slate-300 mb-2">🎁 Kisten öffnen</div>
                      <div className="grid grid-cols-2 gap-2">
                        {BOX_DEFS.map((box) => {
                          const canAfford = state.points >= box.cost;
                          const isPrestigeLocked = box.type === "prestige" && state.prestigeLevel < 1;
                          const isOpening = openingBox === box.type;
                          const rarityGlow = box.type === "prestige" ? "shadow-amber-500/30" : box.type === "epic" ? "shadow-violet-500/20" : box.type === "rare" ? "shadow-blue-500/15" : "shadow-slate-500/10";

                          return (
                            <button
                              key={box.type}
                              onClick={() => handleOpenBox(box.type)}
                              disabled={!canAfford || isPrestigeLocked || isOpening}
                              style={{ perspective: "600px" }}
                              className={`relative group ${isOpening ? "animate-wiggle" : ""}`}
                            >
                              <div className={`relative p-3 rounded-xl border transition-all duration-300 transform-gpu ${
                                isOpening
                                  ? `bg-gradient-to-br ${box.color} ${box.border} shadow-lg ${rarityGlow} scale-95 rotate-2`
                                  : isPrestigeLocked
                                  ? "bg-slate-800/30 border-slate-700/20 opacity-30"
                                  : canAfford
                                  ? `bg-gradient-to-br ${box.color} ${box.border} hover:shadow-lg hover:${rarityGlow} hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 active:rotate-1`
                                  : "bg-slate-800/20 border-slate-700/20 opacity-50"
                              }`}>
                                {/* Shimmer Effekt */}
                                {canAfford && !isPrestigeLocked && !isOpening && (
                                  <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                  </div>
                                )}
                                {/* 3D Glow */}
                                {canAfford && !isPrestigeLocked && (
                                  <div className={`absolute -inset-px rounded-xl bg-gradient-to-br ${box.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 pointer-events-none`} />
                                )}
                                <div className="relative z-10 flex flex-col items-center text-center gap-1.5">
                                  <span className="text-3xl drop-shadow-lg">{box.emoji}</span>
                                  <div>
                                    <div className="text-[11px] font-bold text-white">{box.name}</div>
                                    <div className="text-[9px] text-slate-400">{box.desc}</div>
                                  </div>
                                  <div className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                                    isPrestigeLocked ? "text-slate-600 bg-slate-700/20" :
                                    canAfford ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" :
                                    "text-slate-600 bg-slate-700/20"
                                  }`}>
                                    {isPrestigeLocked ? "🔒 Prestige" : formatNumber(box.cost)}
                                  </div>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pet-Sammlung */}
                    <div>
                      <div className="text-[12px] font-bold text-slate-300 mb-1.5">
                        Sammlung ({new Set(state.ownedPets).size}/{allPets.length}) · {state.activePets.length}/{maxPetSlots} Slots
                      </div>
                      {state.ownedPets.length === 0 ? (
                        <div className="text-center py-4 text-[12px] text-slate-600">
                          Noch keine Pets. Oeffne eine Kiste!
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5">
                          {allPets
                            .filter((pet) => state.ownedPets.includes(pet.id))
                            .map((pet) => {
                              const colors = RARITY_COLORS[pet.rarity];
                              const isActive = state.activePets.includes(pet.id);
                              const count = state.ownedPets.filter((id) => id === pet.id).length;
                              const level = state.petLevels[pet.id] || 1;
                              const upgradeCost = Math.floor(200 * Math.pow(2.5, level - 1));
                              const canUpgrade = level < 10 && state.points >= upgradeCost;
                              const rarityBarColor = pet.rarity === "legendary" ? "bg-amber-400"
                                : pet.rarity === "epic" ? "bg-violet-400"
                                : pet.rarity === "rare" ? "bg-blue-400"
                                : "bg-slate-500";

                              return (
                                <div
                                  key={pet.id}
                                  className={`relative p-2.5 rounded-xl border text-center transition-all overflow-hidden ${
                                    isActive
                                      ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow} ${
                                          pet.rarity === "legendary" ? "ring-1 ring-amber-400/30"
                                          : pet.rarity === "epic" ? "ring-1 ring-violet-400/30"
                                          : pet.rarity === "rare" ? "ring-1 ring-blue-400/30"
                                          : "ring-1 ring-slate-400/30"
                                        }`
                                      : "bg-slate-800/30 border-slate-700/30 hover:border-slate-600 hover:bg-slate-800/40"
                                  }`}
                                >
                                  {/* Rarity color bar at top */}
                                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${rarityBarColor} ${isActive ? "opacity-80" : "opacity-40"}`} />
                                  {/* Glow backdrop */}
                                  {isActive && (
                                    <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-30 ${
                                      pet.rarity === "legendary" ? "bg-amber-400"
                                      : pet.rarity === "epic" ? "bg-violet-400"
                                      : pet.rarity === "rare" ? "bg-blue-400"
                                      : "bg-slate-400"
                                    }`} />
                                  )}
                                  <button
                                    onClick={() => handleEquipPet(pet.id)}
                                    className="w-full"
                                    disabled={!isActive && state.activePets.length >= maxPetSlots}
                                  >
                                    <div className="text-3xl mb-1 relative z-10">{pet.emoji}</div>
                                    <div className={`text-[10px] font-bold truncate relative z-10 ${isActive ? colors.text : "text-slate-300"}`}>
                                      {pet.name}
                                    </div>
                                    <div className={`text-[8px] truncate relative z-10 mt-0.5 ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
                                      {pet.bonusType === "click" ? "👆" : pet.bonusType === "auto" ? "🤖" : "⚡"} +{pet.bonusPercent * level}%
                                    </div>
                                  </button>
                                  {/* Level + Upgrade */}
                                  <div className="flex items-center justify-center gap-1 mt-0.5 relative z-10">
                                    <span className="text-[7px] font-bold text-amber-400/70">Lv.{level}</span>
                                    {level < 10 && (
                                      <button
                                        onClick={(e) => { e.stopPropagation(); handleUpgradePet(pet.id); }}
                                        disabled={!canUpgrade}
                                        className={`text-[7px] font-bold px-1 rounded ${
                                          canUpgrade ? "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20" : "text-slate-600"
                                        }`}
                                        title={`Upgrade: ${formatNumber(upgradeCost)} Punkte`}
                                      >
                                        ⬆
                                      </button>
                                    )}
                                  </div>
                                  {/* Count badge */}
                                  {count > 1 && (
                                    <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-slate-900 rounded-full text-[8px] font-bold text-slate-300 border border-slate-600 z-20">
                                      x{count}
                                    </div>
                                  )}
                                  {/* Active indicator */}
                                  {isActive && (
                                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-green-500/20 border border-green-500/40 rounded-full text-[7px] font-bold text-green-300 z-20 whitespace-nowrap">
                                      Aktiv
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ════ PRESTIGE TAB ════ */}
                {activeTab === "prestige" && (
                  <div className="space-y-2.5">

                    {/* ─── Status + Aktion ─── */}
                    <div className="p-3 rounded-xl bg-gradient-to-br from-rose-500/10 via-violet-500/10 to-amber-500/5 border border-rose-500/15">
                      <div className="flex items-center gap-3 mb-2.5">
                        <div className="text-3xl">
                          {state.prestigeLevel >= 30 ? "☀️" :
                           state.prestigeLevel >= 25 ? "🔮" :
                           state.prestigeLevel >= 20 ? "🌌" :
                           state.prestigeLevel >= 15 ? "👑" :
                           state.prestigeLevel >= 12 ? "💎" :
                           state.prestigeLevel >= 8 ? "🥇" :
                           state.prestigeLevel >= 5 ? "🥈" :
                           state.prestigeLevel >= 3 ? "🥉" :
                           state.prestigeLevel >= 1 ? "⭐" : "🌟"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[15px] font-black text-white">Prestige {state.prestigeLevel}</span>
                            {prestigeMultiplier > 1 && (
                              <span className="px-1.5 py-0.5 bg-rose-500/20 border border-rose-500/40 rounded text-[9px] font-bold text-rose-300">
                                x{prestigeMultiplier.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-violet-300 font-medium">{state.prestigePoints} PP</div>
                        </div>
                        {/* Prestige Button */}
                        {state.totalPoints >= 10000 && !showPrestigeConfirm && (
                          <button
                            onClick={() => setShowPrestigeConfirm(true)}
                            className="px-3 py-1.5 bg-rose-500/20 border border-rose-500/40 rounded-lg text-[11px] font-bold text-rose-300 hover:bg-rose-500/30 transition-all active:scale-95"
                          >
                            ✨ Prestige
                          </button>
                        )}
                      </div>

                      {/* Prestige-Info: PP-Gewinn + Nächster Rang */}
                      {state.totalPoints >= 10000 && (
                        <div className="flex items-center gap-3 mb-2 text-[10px]">
                          <div className="flex items-center gap-1 text-violet-400">
                            <span>✨</span>
                            <span className="font-bold">+{prestigePointsToGain} PP</span>
                            <span className="text-slate-500">jetzt</span>
                          </div>
                          <div className="flex-1 h-px bg-slate-700/30" />
                          <div className="flex items-center gap-1 text-amber-400/80">
                            <span>{nextRank ? nextRank.icon : "✅"}</span>
                            <span className="font-bold">{nextRank ? `→ ${nextRank.name} (P${nextRank.lvl})` : "Alle Ränge!"}</span>
                          </div>
                        </div>
                      )}

                      {/* Progress zum nächsten Tier */}
                      {(() => {
                        const tiers = [1, 3, 5, 8, 12, 15];
                        const nextTier = tiers.find(t => t > state.prestigeLevel);
                        if (!nextTier) return null;
                        const prevTier = tiers.filter(t => t <= state.prestigeLevel).pop() || 0;
                        const progress = ((state.prestigeLevel - prevTier) / (nextTier - prevTier)) * 100;
                        return (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-rose-500 to-violet-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>
                            <span className="text-[9px] text-slate-500 whitespace-nowrap">→ P{nextTier}</span>
                          </div>
                        );
                      })()}

                      {/* Prestige Confirm Dialog */}
                      {showPrestigeConfirm && (
                        <div className="mt-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/25">
                          <div className="text-[11px] text-center text-slate-300 mb-2">
                            Du erhältst <span className="font-black text-violet-400">{prestigePointsToGain} PP</span> — Pets bleiben!
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setShowPrestigeConfirm(false)} className="flex-1 py-1.5 rounded-lg bg-slate-700/50 border border-slate-600/50 text-[11px] text-slate-300 hover:bg-slate-700 transition-colors">
                              Abbrechen
                            </button>
                            <button onClick={handlePrestige} className="flex-1 py-1.5 rounded-lg bg-rose-500/30 border border-rose-500/50 text-[11px] font-bold text-rose-300 hover:bg-rose-500/40 transition-all active:scale-95">
                              ✨ Prestige!
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Locked */}
                      {state.totalPoints < 10000 && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 bg-slate-700/40 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-600 rounded-full transition-all" style={{ width: `${Math.min(100, (state.totalPoints / 10000) * 100)}%` }} />
                          </div>
                          <span className="text-[9px] text-slate-600">{formatNumber(state.totalPoints)}/10K</span>
                        </div>
                      )}
                    </div>

                    {/* ─── Prestige-Skills ─── */}
                    <div className="p-2.5 rounded-xl bg-slate-800/20 border border-slate-700/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-rose-300">🌟 Skills</span>
                        <span className="text-[9px] text-slate-600">{state.prestigePoints} PP verfügbar</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: "critChance", name: "Krit", icon: "💥", desc: "+2% Chance auf 2x Klick-Schaden", baseCost: 3, max: 10 },
                          { id: "clickMastery", name: "Click+", icon: "🖱️", desc: "+5% Klick-Power pro Level", baseCost: 4, max: 10 },
                          { id: "luck", name: "Glück", icon: "🍀", desc: "+3% Bonus-Points bei jedem Klick", baseCost: 5, max: 8 },
                          { id: "goldenTouch", name: "Gold", icon: "✨", desc: "+1% Chance auf 10x Golden Click", baseCost: 10, max: 3 },
                          { id: "goldRush", name: "Rush", icon: "💰", desc: "Alle 5 Min: 10s lang 2x Punkte", baseCost: 12, max: 3 },
                          { id: "autoBoost", name: "Auto", icon: "⚡", desc: "+5% Auto-Punkte pro Sekunde", baseCost: 4, max: 8 },
                          { id: "speedBoost", name: "Speed", icon: "🏎️", desc: "+3% Auto-Tick Geschwindigkeit", baseCost: 6, max: 5 },
                          { id: "petLover", name: "Pet+", icon: "🐾", desc: "+10% Pet-Bonus Stärke", baseCost: 8, max: 5 },
                          { id: "petSlots", name: "Slot", icon: "🔲", desc: "1 zusätzlicher Pet-Slot (starte mit 1)", baseCost: 15, max: 5 },
                        ].map((skill) => {
                          const lvl = (state as Record<string, unknown>)[`prestige_skill_${skill.id}`] as number || 0;
                          const scaledCost = Math.floor(skill.baseCost * Math.pow(1.5, lvl));
                          const canBuy = state.prestigePoints >= scaledCost && lvl < skill.max;
                          const maxed = lvl >= skill.max;
                          return (
                            <div
                              key={skill.id}
                              className={`relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all ${
                                maxed ? "bg-amber-500/10 border-amber-500/25 shadow-sm shadow-amber-500/10" :
                                canBuy ? "bg-rose-500/10 border-rose-500/25 cursor-pointer hover:border-rose-400/50 hover:bg-rose-500/15 active:scale-[0.97] shadow-sm shadow-rose-500/5" :
                                "bg-slate-800/15 border-slate-700/20 opacity-50"
                              }`}
                              onClick={() => {
                                if (!canBuy || !user) return;
                                setState(prev => ({ ...prev, prestigePoints: prev.prestigePoints - scaledCost, [`prestige_skill_${skill.id}`]: lvl + 1 }));
                                flushPendingClicks().then(() => {
                                  import("@/lib/auth").then(mod => mod.updateUserProfile(user.uid, { [`clickerPrestigeSkill_${skill.id}`]: lvl + 1, clickerPrestigePoints: state.prestigePoints - scaledCost }));
                                });
                              }}
                              onMouseEnter={() => handleTooltipEnter(skill.id)}
                              onMouseLeave={handleTooltipLeave}
                            >
                              {tooltipSkill === skill.id && (
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-950 border border-slate-500/60 rounded-lg text-[10px] text-slate-100 whitespace-nowrap z-50 shadow-xl shadow-black/50 pointer-events-none font-medium">
                                  {skill.desc}
                                  {lvl > 0 && <span className="text-amber-400 ml-1">(Lv.{lvl}/{skill.max})</span>}
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500/60" />
                                </div>
                              )}
                              <span className="text-sm">{skill.icon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] font-bold text-white truncate">{skill.name}</div>
                                <div className="flex gap-0.5 mt-0.5">
                                  {Array.from({ length: skill.max }).map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < lvl ? "bg-amber-400" : "bg-slate-700"}`} />
                                  ))}
                                </div>
                              </div>
                              <span className={`text-[8px] font-bold ${maxed ? "text-amber-400" : canBuy ? "text-rose-300" : "text-slate-600"}`}>
                                {maxed ? "✓" : `${scaledCost}PP`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ─── Prestige-Stufen (kompakt) ─── */}
                    <div className="p-2.5 rounded-xl bg-slate-800/20 border border-slate-700/20">
                      <div className="text-[11px] font-bold text-slate-400 mb-1.5">Ränge</div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { lvl: 1, icon: "⭐", name: "Stern" },
                          { lvl: 3, icon: "🥉", name: "Bronze" },
                          { lvl: 5, icon: "🥈", name: "Silber" },
                          { lvl: 8, icon: "🥇", name: "Gold" },
                          { lvl: 12, icon: "💎", name: "Diamant" },
                          { lvl: 15, icon: "👑", name: "Legendär" },
                          { lvl: 20, icon: "🌌", name: "Kosmisch" },
                          { lvl: 25, icon: "🔮", name: "Omniscient" },
                          { lvl: 30, icon: "☀️", name: "Göttlich" },
                        ].map((tier) => {
                          const unlocked = state.prestigeLevel >= tier.lvl;
                          return (
                            <div
                              key={tier.lvl}
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] ${
                                unlocked
                                  ? "bg-violet-500/10 border-violet-500/25 text-violet-300"
                                  : "bg-slate-800/10 border-slate-700/15 text-slate-600"
                              }`}
                            >
                              <span>{tier.icon}</span>
                              <span className="font-medium">{tier.name}</span>
                              <span className="text-[8px] opacity-60">P{tier.lvl}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ─── Info (kurz) ─── */}
                    <div className="px-2 py-1.5 text-[9px] text-slate-600 text-center leading-relaxed">
                      Prestige-Punkte berechnen sich aus deinen Gesamtpunkten. Deine Pets bleiben erhalten!
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-3 py-1.5 border-t border-slate-700/50 flex justify-between items-center">
                <button
                  onClick={handleReset}
                  className="text-[10px] text-slate-600 hover:text-red-400 transition-colors"
                >
                  Reset
                </button>
                <div className="text-[10px] text-slate-600">
                  Lerne weiter — Punkte kommen automatisch!
                </div>
              </div>
            </>
          )}

          {loading && (
            <div className="p-4 text-center text-slate-500 text-xs">Lade...</div>
          )}

          {loadError && !loading && (
            <div className="p-3 text-center">
              <div className="text-red-400 text-xs mb-2">Fortschritt konnte nicht geladen werden</div>
              <button
                onClick={() => {
                  if (user) {
                    loadedUidRef.current = null;
                    setLoading(true);
                    setLoadError(false);
                    loadClickerState(user.uid).then((s) => {
                      setState(s);
                      setLoading(false);
                    }).catch(() => {
                      setLoading(false);
                      setLoadError(true);
                    });
                  }
                }}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-300"
              >
                Erneut versuchen
              </button>
            </div>
          )}
        </div>
        {/* Resize Handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50"
          onPointerDown={handleResizeStart}
          style={{ touchAction: "none" }}
        >
          <svg className="w-3 h-3 text-slate-600 absolute bottom-0.5 right-0.5" viewBox="0 0 16 16">
            <path d="M14 16L16 14M10 16L16 10M6 16L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          50% { opacity: 1; transform: translateY(-30px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-60px) scale(0.8); }
        }
        @keyframes floatUpBig {
          0% { opacity: 1; transform: translateY(0) scale(0.5); }
          30% { opacity: 1; transform: translateY(-20px) scale(1.4); }
          60% { opacity: 1; transform: translateY(-45px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-70px) scale(0.6); }
        }
        @keyframes particle-burst {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(
            calc(cos(var(--angle)) * var(--dist)),
            calc(sin(var(--angle)) * var(--dist))
          ) scale(0); }
        }
        @keyframes prestige-glow {
          0%, 100% { box-shadow: 0 0 4px 2px #f43f5e, 0 0 12px 4px rgba(244,63,94,0.3), 0 0 24px 8px rgba(251,191,36,0.15); }
          50% { box-shadow: 0 0 6px 3px #fb7185, 0 0 18px 6px rgba(251,113,133,0.4), 0 0 32px 10px rgba(251,191,36,0.2); }
        }
        .prestige-glow {
          animation: prestige-glow 2s ease-in-out infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.6s ease-in-out;
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .prestige-glitch-overlay {
          animation: glitch-overlay 2.5s ease-in-out forwards;
        }
        @keyframes glitch-overlay {
          0% { opacity: 0; }
          8% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        .prestige-glitch-text {
          animation: glitch-text 0.25s ease-in-out infinite alternate;
        }
        @keyframes glitch-text {
          0% { text-shadow: 3px 0 #f43f5e, -3px 0 #3b82f6; transform: translate(0); }
          25% { text-shadow: -3px 0 #f43f5e, 3px 0 #3b82f6; transform: translate(3px, -2px); }
          50% { text-shadow: 3px 3px #f43f5e, -3px -3px #3b82f6; transform: translate(-2px, 3px); }
          75% { text-shadow: -3px -3px #f43f5e, 3px 3px #3b82f6; transform: translate(2px, -3px); }
          100% { text-shadow: 3px 0 #f43f5e, -3px 0 #3b82f6; transform: translate(0); }
        }
        /* Button glow on combo/golden */
        .animate-click-glow {
          animation: click-glow 0.4s ease-out;
        }
        @keyframes click-glow {
          0% { box-shadow: 0 0 0px 0px rgba(250,204,21,0); }
          30% { box-shadow: 0 0 20px 8px rgba(250,204,21,0.5), 0 0 40px 16px rgba(245,158,11,0.2); }
          100% { box-shadow: 0 0 0px 0px rgba(250,204,21,0); }
        }
        .animate-click-glow-golden {
          animation: click-glow-golden 0.5s ease-out;
        }
        @keyframes click-glow-golden {
          0% { box-shadow: 0 0 0px 0px rgba(255,215,0,0); transform: scale(1); }
          20% { box-shadow: 0 0 30px 12px rgba(255,215,0,0.6), 0 0 60px 24px rgba(255,215,0,0.2); transform: scale(1.08); }
          100% { box-shadow: 0 0 0px 0px rgba(255,215,0,0); transform: scale(1); }
        }
        /* Fade in for overlays */
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        /* Prestige radial particle burst */
        @keyframes prestige-radial {
          0% { opacity: 1; transform: translate(-50%, -50%) translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) translate(
            calc(cos(var(--pp-angle)) * var(--pp-dist)),
            calc(sin(var(--pp-angle)) * var(--pp-dist))
          ) scale(0); }
        }
        /* Prestige scanlines effect */
        .prestige-scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          );
          animation: scanline-scroll 0.5s linear infinite;
        }
        @keyframes scanline-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 4px; }
        }
        /* Prestige color distortion bars */
        .prestige-color-bars {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(244,63,94,0.15) 15%,
            transparent 30%,
            rgba(59,130,246,0.15) 50%,
            transparent 65%,
            rgba(168,85,247,0.15) 80%,
            transparent 100%
          );
          animation: color-bars-move 0.8s ease-in-out infinite alternate;
        }
        @keyframes color-bars-move {
          0% { transform: translateX(-20%); }
          100% { transform: translateX(20%); }
        }
        /* Prestige level number pop */
        .prestige-level-pop {
          animation: level-pop 0.8s ease-out forwards;
        }
        @keyframes level-pop {
          0% { opacity: 0; transform: scale(3); }
          40% { opacity: 1; transform: scale(0.8); }
          60% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        /* Prestige subtitle fade in */
        .prestige-subtitle {
          animation: subtitle-in 1s ease-out 0.5s both;
        }
        @keyframes subtitle-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 0.7; transform: translateY(0); }
        }
        /* Prestige expanding ring */
        .prestige-expand-ring {
          animation: expand-ring 2s ease-out forwards;
        }
        @keyframes expand-ring {
          0% { transform: scale(0.5); opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; }
        }
        @keyframes autoTickFloat {
          0% { opacity: 0.6; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes comboTimerShrink {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        @keyframes clickPulseRing {
          0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
        /* Accessibility: reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
