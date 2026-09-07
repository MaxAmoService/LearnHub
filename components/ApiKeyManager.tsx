"use client";

// API-Key-Verwaltung (Profil → Tab "API"). Die apiKeys-Collection ist für
// Clients komplett gesperrt — alle Operationen laufen über /api/v1/keys mit
// dem Firebase-ID-Token des eingeloggten Users.

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Copy,
  Eye,
  KeyRound,
  Loader2,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { getAuthInstance } from "@/lib/firebase";

interface ApiKeyInfo {
  keyHash: string;
  label: string;
  scopes: ("read" | "write")[];
  createdAt: string;
  lastUsedAt: string | null;
  masked: string;
}

const SCOPE_LABELS: Record<ApiKeyInfo["scopes"][number], string> = {
  read: "Lesen",
  write: "Schreiben",
};

export function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKeyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [label, setLabel] = useState("");
  const [scopes, setScopes] = useState<Set<"read" | "write">>(new Set(["read"]));
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);

  const getToken = useCallback(async (): Promise<string> => {
    const fbUser = getAuthInstance().currentUser;
    if (!fbUser) throw new Error("Nicht eingeloggt");
    return fbUser.getIdToken();
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/keys", {
        headers: { Authorization: `Bearer ${await getToken()}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error();
      setKeys(await res.json());
    } catch {
      setError("Keys konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (scopes.size === 0 || label.trim().length === 0) return;
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/v1/keys", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: label.trim(), scopes: [...scopes] }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "key_limit_reached"
            ? "Limit erreicht — widerrufe zuerst einen alten Key."
            : "Key konnte nicht erstellt werden."
        );
        return;
      }
      setNewKey(data.key);
      setCopied(false);
      setLabel("");
      setScopes(new Set(["read"]));
      await load();
    } catch {
      setError("Key konnte nicht erstellt werden.");
    } finally {
      setCreating(false);
    }
  }

  async function handleRevoke(keyHash: string) {
    if (!window.confirm("Key wirklich widerrufen? Angeschlossene Geräte verlieren sofort den Zugriff.")) return;
    setRevoking(keyHash);
    setError("");
    try {
      const res = await fetch(`/api/v1/keys/${keyHash}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (!res.ok) throw new Error();
      await load();
    } catch {
      setError("Key konnte nicht widerrufen werden.");
    } finally {
      setRevoking(null);
    }
  }

  async function handleCopy() {
    if (!newKey) return;
    try {
      await navigator.clipboard.writeText(newKey);
      setCopied(true);
    } catch {
      /* Zwischenablage blockiert — Key bleibt sichtbar. */
    }
  }

  function toggleScope(scope: "read" | "write") {
    setScopes((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) next.delete(scope);
      else next.add(scope);
      return next;
    });
  }

  return (
    <div className="space-y-6">
      {/* Einmalige Klartext-Anzeige */}
      {newKey && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/40 rounded-xl space-y-3">
          <p className="font-semibold text-amber-400 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Neuer API-Key
          </p>
          <p className="text-xs text-slate-400">
            Dieser Key wird nur <span className="font-semibold text-white">jetzt einmal</span> angezeigt.
            Bewahre ihn sicher auf — nach dem Schließen ist er nicht mehr abrufbar.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-black/40 border border-slate-700 rounded-lg text-sm break-all">
              {newKey}
            </code>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700"
              title="Kopieren"
            >
              {copied ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            onClick={() => setNewKey(null)}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            Ich habe den Key gespeichert — schließen
          </button>
        </div>
      )}

      {/* Erstellen */}
      <form onSubmit={handleCreate} className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Plus className="w-5 h-5 text-blue-400" /> Neuen Key erstellen
        </h3>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Bezeichnung</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="z. B. ESP32 Schreibtisch"
            maxLength={40}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-2">Berechtigungen</label>
          <div className="flex flex-wrap gap-2">
            {(["read", "write"] as const).map((scope) => {
              const active = scopes.has(scope);
              return (
                <button
                  key={scope}
                  type="button"
                  onClick={() => toggleScope(scope)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    active
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                      : "bg-slate-100 dark:bg-slate-800/40 border-slate-300 dark:border-slate-700/60 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {scope === "read" ? "Lesen (Tagesplan)" : "Schreiben (Abhaken)"}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          disabled={creating || label.trim().length === 0 || scopes.size === 0}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
          Key erstellen
        </button>
      </form>

      <hr className="border-slate-700/50" />

      {/* Liste */}
      <div>
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" /> Deine Keys
        </h3>
        {error && (
          <p className="mb-3 text-sm text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> {error}
          </p>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
          </div>
        ) : keys.length === 0 ? (
          <p className="text-sm text-slate-400">
            Noch keine Keys. Erstelle einen, um Geräte wie den ESP32 oder ein
            Desktop-Widget anzubinden.
          </p>
        ) : (
          <div className="space-y-2">
            {keys.map((key) => (
              <div
                key={key.keyHash}
                className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl"
              >
                <div className="min-w-0">
                  <p className="font-medium">{key.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {key.masked}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {key.scopes.map((scope) => (
                      <span
                        key={scope}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium"
                      >
                        {SCOPE_LABELS[scope]}
                      </span>
                    ))}
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {key.lastUsedAt
                        ? `Zuletzt ${new Date(key.lastUsedAt).toLocaleString("de-DE")}`
                        : "Nie verwendet"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRevoke(key.keyHash)}
                  disabled={revoking !== null}
                  className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium flex items-center gap-1.5 disabled:opacity-40"
                >
                  {revoking === key.keyHash ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Widerrufen
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
