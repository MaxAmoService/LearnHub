// Tests für die serverseitige Bestenliste (lib/leaderboard.ts — reine
// Funktionen, kein Firestore). Prüft Opt-In-Filter, Positivliste (keine
// Fremdfelder wie email/settings/clicker*), Sortierung und die
// Online-Berechnung.

import { describe, expect, it } from "vitest";
import {
  LEADERBOARD_LIMIT,
  computeOnline,
  mapLeaderboardDocs,
  mapPublicUserProfile,
} from "@/lib/leaderboard";

function doc(uid: string, data: Record<string, unknown>) {
  return { id: uid, data };
}

const FULL_PROFILE = {
  leaderboardOptIn: true,
  uid: "u1",
  username: "alice",
  displayName: "Alice A.",
  avatar: "🦊",
  equippedFrame: "gold",
  totalXP: 120,
  streak: 3,
  completedModules: ["m-a", "m-b", "m-c"],
  email: "alice@example.com",
  settings: { theme: "dark" },
  clickerPoints: 999,
  clickerUpgrades: { a: 1 },
  bio: "Hi",
  createdAt: "2024-01-01T00:00:00.000Z",
};

describe("mapLeaderboardDocs", () => {
  it("liefert nur opted-in Nutzer (leaderboardOptIn !== true entfällt)", () => {
    const ohneFeld = { ...FULL_PROFILE };
    delete (ohneFeld as Record<string, unknown>).leaderboardOptIn;
    const entries = mapLeaderboardDocs([
      doc("u1", FULL_PROFILE),
      doc("u2", { ...FULL_PROFILE, username: "bob", leaderboardOptIn: false }),
      doc("u3", { ...ohneFeld, username: "carol" }), // Feld fehlt komplett
    ], 0);
    expect(entries.map((e) => e.username)).toEqual(["alice"]);
  });

  it("überspringt Nutzer ohne username", () => {
    const entries = mapLeaderboardDocs([
      doc("u1", { ...FULL_PROFILE, username: "" }),
      doc("u2", { ...FULL_PROFILE, username: "bob" }),
    ], 0);
    expect(entries.map((e) => e.uid)).toEqual(["u2"]);
  });

  it("liefert exakt die Positivliste — kein email/settings/clicker-Feld", () => {
    const entries = mapLeaderboardDocs([doc("u1", FULL_PROFILE)], 0);
    expect(entries).toHaveLength(1);
    expect(Object.keys(entries[0]).sort()).toEqual([
      "avatar",
      "completedModules",
      "equippedFrame",
      "online",
      "streak",
      "totalXP",
      "uid",
      "username",
    ]);
    expect(JSON.stringify(entries[0])).not.toContain("alice@example.com");
    expect(JSON.stringify(entries[0])).not.toContain("clicker");
    expect(entries[0].completedModules).toBe(3);
  });

  it("sortiert serverseitig nach totalXP absteigend", () => {
    const entries = mapLeaderboardDocs([
      doc("u1", { ...FULL_PROFILE, username: "low", totalXP: 10 }),
      doc("u2", { ...FULL_PROFILE, username: "high", totalXP: 300 }),
      doc("u3", { ...FULL_PROFILE, username: "mid", totalXP: 150 }),
    ], 0);
    expect(entries.map((e) => e.username)).toEqual(["high", "mid", "low"]);
  });

  it("kürzt auf LEADERBOARD_LIMIT", () => {
    const docs = Array.from({ length: LEADERBOARD_LIMIT + 10 }, (_, i) =>
      doc(`u${i}`, { ...FULL_PROFILE, username: `user${i}`, totalXP: i })
    );
    expect(mapLeaderboardDocs(docs, 0)).toHaveLength(LEADERBOARD_LIMIT);
  });

  it("nutzt Defaults für fehlende Felder", () => {
    const entries = mapLeaderboardDocs([
      doc("u1", { leaderboardOptIn: true, username: "minimal" }),
    ], 0);
    expect(entries[0]).toMatchObject({
      avatar: "🎓",
      equippedFrame: "none",
      totalXP: 0,
      streak: 0,
      completedModules: 0,
      online: false,
    });
  });
});

describe("computeOnline", () => {
  it("online, wenn state online und lastChanged frisch", () => {
    expect(
      computeOnline({ state: "online", lastChanged: new Date(100_000).toISOString() }, 100_000 + 59_000)
    ).toBe(true);
  });

  it("offline bei zu altem lastChanged (Schwelle 60s)", () => {
    expect(
      computeOnline({ state: "online", lastChanged: new Date(100_000).toISOString() }, 100_000 + 61_000)
    ).toBe(false);
  });

  it("offline bei fehlendem Status oder anderem state", () => {
    expect(computeOnline(null, 0)).toBe(false);
    expect(computeOnline({ state: "offline", lastChanged: "2024-01-01T00:00:00Z" }, Date.now())).toBe(false);
  });
});

describe("mapPublicUserProfile", () => {
  it("liefert nur uid/username/bio/createdAt (Positivliste)", () => {
    const profile = mapPublicUserProfile("u1", FULL_PROFILE as unknown as Record<string, unknown>);
    expect(Object.keys(profile).sort()).toEqual(["bio", "createdAt", "uid", "username"]);
    expect(JSON.stringify(profile)).not.toContain("alice@example.com");
    expect(JSON.stringify(profile)).not.toContain("clicker");
    expect(profile.bio).toBe("Hi");
  });

  it("normalisiert createdAt (ISO-String, Timestamp-Objekt, fehlend)", () => {
    expect(mapPublicUserProfile("u1", { username: "a", createdAt: "2024-01-01T00:00:00.000Z" }).createdAt)
      .toBe("2024-01-01T00:00:00.000Z");
    const ts = { toDate: () => new Date("2024-01-01T00:00:00.000Z") };
    expect(mapPublicUserProfile("u1", { username: "a", createdAt: ts }).createdAt)
      .toBe("2024-01-01T00:00:00.000Z");
    expect(mapPublicUserProfile("u1", { username: "a" }).createdAt).toBeNull();
  });
});
