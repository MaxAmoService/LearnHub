"use client";

import { useState, useCallback } from "react";

interface ERAttribute {
  name: string;
  isPK: boolean;
  type?: string;
}

interface EREntity {
  id: string;
  name: string;
  x: number;
  y: number;
  attributes: ERAttribute[];
  color: string;
}

interface ERRelationship {
  id: string;
  from: string;
  to: string;
  label: string;
  cardinality: "1:1" | "1:n" | "n:m";
}

const ENTITY_COLORS = ["#3B82F6", "#22C55E", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4", "#EF4444"];

export function ERDiagramBuilder() {
  const [entities, setEntities] = useState<EREntity[]>([]);
  const [relationships, setRelationships] = useState<ERRelationship[]>([]);
  const [newEntityName, setNewEntityName] = useState("");
  const [newAttrName, setNewAttrName] = useState("");
  const [newAttrIsPK, setNewAttrIsPK] = useState(false);
  const [newAttrType, setNewAttrType] = useState("VARCHAR(100)");
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [relFrom, setRelFrom] = useState("");
  const [relTo, setRelTo] = useState("");
  const [relLabel, setRelLabel] = useState("");
  const [relCard, setRelCard] = useState<"1:1" | "1:n" | "n:m">("1:n");
  const [showRelForm, setShowRelForm] = useState(false);

  const addEntity = useCallback(() => {
    if (!newEntityName.trim()) return;
    const color = ENTITY_COLORS[entities.length % ENTITY_COLORS.length];
    const newEntity: EREntity = {
      id: `e${Date.now()}`,
      name: newEntityName.trim(),
      x: 50 + (entities.length % 3) * 220,
      y: 50 + Math.floor(entities.length / 3) * 200,
      attributes: [],
      color,
    };
    setEntities((prev) => [...prev, newEntity]);
    setNewEntityName("");
  }, [newEntityName, entities.length]);

  const addAttribute = useCallback(() => {
    if (!selectedEntity || !newAttrName.trim()) return;
    setEntities((prev) =>
      prev.map((e) =>
        e.id === selectedEntity
          ? { ...e, attributes: [...e.attributes, { name: newAttrName.trim(), isPK: newAttrIsPK, type: newAttrType }] }
          : e
      )
    );
    setNewAttrName("");
    setNewAttrIsPK(false);
  }, [selectedEntity, newAttrName, newAttrIsPK, newAttrType]);

  const removeEntity = useCallback((id: string) => {
    setEntities((prev) => prev.filter((e) => e.id !== id));
    setRelationships((prev) => prev.filter((r) => r.from !== id && r.to !== id));
    if (selectedEntity === id) setSelectedEntity(null);
  }, [selectedEntity]);

  const removeAttribute = useCallback((entityId: string, attrIndex: number) => {
    setEntities((prev) =>
      prev.map((e) =>
        e.id === entityId
          ? { ...e, attributes: e.attributes.filter((_, i) => i !== attrIndex) }
          : e
      )
    );
  }, []);

  const addRelationship = useCallback(() => {
    if (!relFrom || !relTo || !relLabel.trim()) return;
    setRelationships((prev) => [
      ...prev,
      { id: `r${Date.now()}`, from: relFrom, to: relTo, label: relLabel.trim(), cardinality: relCard },
    ]);
    setRelLabel("");
    setShowRelForm(false);
  }, [relFrom, relTo, relLabel, relCard]);

  const loadExample = useCallback(() => {
    setEntities([
      { id: "e1", name: "Kunde", x: 50, y: 60, attributes: [{ name: "KundenID", isPK: true, type: "INT" }, { name: "Name", isPK: false, type: "VARCHAR(100)" }, { name: "Email", isPK: false, type: "VARCHAR(255)" }], color: "#3B82F6" },
      { id: "e2", name: "Bestellung", x: 320, y: 60, attributes: [{ name: "BestellID", isPK: true, type: "INT" }, { name: "Datum", isPK: false, type: "DATE" }, { name: "Betrag", isPK: false, type: "DECIMAL(10,2)" }], color: "#22C55E" },
      { id: "e3", name: "Produkt", x: 590, y: 60, attributes: [{ name: "ProduktID", isPK: true, type: "INT" }, { name: "Name", isPK: false, type: "VARCHAR(100)" }, { name: "Preis", isPK: false, type: "DECIMAL(10,2)" }], color: "#F59E0B" },
      { id: "e4", name: "Bestellposition", x: 450, y: 260, attributes: [{ name: "BestellID", isPK: true, type: "INT" }, { name: "ProduktID", isPK: true, type: "INT" }, { name: "Menge", isPK: false, type: "INT" }], color: "#EC4899" },
    ]);
    setRelationships([
      { id: "r1", from: "e1", to: "e2", label: "hat", cardinality: "1:n" },
      { id: "r2", from: "e2", to: "e4", label: "enthält", cardinality: "1:n" },
      { id: "r3", from: "e3", to: "e4", label: "ist in", cardinality: "1:n" },
    ]);
  }, []);

  const selectedEnt = entities.find((e) => e.id === selectedEntity);

  return (
    <div className="my-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-900/50 overflow-hidden">
      <div className="bg-purple-900/30 px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">🏗️ ER-Diagramm Builder</h3>
          <p className="text-sm text-purple-200/70">Baue dein eigenes Entity-Relationship-Diagramm</p>
        </div>
        <button onClick={loadExample} className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors">
          Beispiel laden
        </button>
      </div>

      <div className="p-4">
        {/* Entity creation */}
        <div className="flex gap-2 mb-3 flex-wrap">
          <input
            type="text"
            value={newEntityName}
            onChange={(e) => setNewEntityName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addEntity()}
            placeholder="Neue Entität (z.B. Kunde)"
            className="flex-1 min-w-[200px] bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
          />
          <button onClick={addEntity} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors">
            + Entität
          </button>
          <button onClick={() => setShowRelForm(!showRelForm)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
            + Beziehung
          </button>
        </div>

        {/* Relationship form */}
        {showRelForm && (
          <div className="bg-slate-800/80 rounded-lg p-3 mb-3 border border-slate-600 flex gap-2 flex-wrap items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Von</label>
              <select value={relFrom} onChange={(e) => setRelFrom(e.target.value)} className="bg-slate-700 text-white text-sm rounded px-2 py-1.5 border border-slate-600">
                <option value="">Wähle...</option>
                {entities.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Nach</label>
              <select value={relTo} onChange={(e) => setRelTo(e.target.value)} className="bg-slate-700 text-white text-sm rounded px-2 py-1.5 border border-slate-600">
                <option value="">Wähle...</option>
                {entities.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Beziehung (Verb)</label>
              <input type="text" value={relLabel} onChange={(e) => setRelLabel(e.target.value)} placeholder="z.B. hat" className="bg-slate-700 text-white text-sm rounded px-2 py-1.5 border border-slate-600 w-28" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Kardinalität</label>
              <select value={relCard} onChange={(e) => setRelCard(e.target.value as "1:1" | "1:n" | "n:m")} className="bg-slate-700 text-white text-sm rounded px-2 py-1.5 border border-slate-600">
                <option value="1:1">1:1</option>
                <option value="1:n">1:n</option>
                <option value="n:m">n:m</option>
              </select>
            </div>
            <button onClick={addRelationship} className="px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-sm">OK</button>
          </div>
        )}

        {/* Attribute editor for selected entity */}
        {selectedEnt && (
          <div className="bg-slate-800/80 rounded-lg p-3 mb-3 border border-slate-600">
            <h4 className="text-sm font-bold text-white mb-2" style={{ color: selectedEnt.color }}>
              Attribute für &quot;{selectedEnt.name}&quot;
            </h4>
            <div className="flex gap-2 mb-2 flex-wrap">
              <input
                type="text"
                value={newAttrName}
                onChange={(e) => setNewAttrName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAttribute()}
                placeholder="Attributname"
                className="flex-1 min-w-[150px] bg-slate-700 border border-slate-600 rounded px-2 py-1.5 text-sm text-white placeholder-slate-400 focus:border-purple-500 focus:outline-none"
              />
              <select
                value={newAttrType}
                onChange={(e) => setNewAttrType(e.target.value)}
                className="bg-slate-700 text-white text-sm rounded px-2 py-1.5 border border-slate-600"
              >
                <option value="INT">INT</option>
                <option value="VARCHAR(50)">VARCHAR(50)</option>
                <option value="VARCHAR(100)">VARCHAR(100)</option>
                <option value="VARCHAR(255)">VARCHAR(255)</option>
                <option value="TEXT">TEXT</option>
                <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                <option value="FLOAT">FLOAT</option>
                <option value="BOOLEAN">BOOLEAN</option>
                <option value="DATE">DATE</option>
                <option value="TIMESTAMP">TIMESTAMP</option>
                <option value="SERIAL">SERIAL</option>
              </select>
              <label className="flex items-center gap-1 text-xs text-slate-300">
                <input type="checkbox" checked={newAttrIsPK} onChange={(e) => setNewAttrIsPK(e.target.checked)} className="rounded" />
                PK
              </label>
              <button onClick={addAttribute} className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm">+</button>
            </div>
            {selectedEnt.attributes.map((attr, i) => (
              <div key={i} className="flex items-center gap-2 text-xs mb-1 group">
                {attr.isPK && <span className="text-yellow-400">🔑</span>}
                <span className={attr.isPK ? "text-yellow-300 font-semibold" : "text-slate-300"}>{attr.name}</span>
                {attr.type && <span className="text-purple-400/70 font-mono text-[10px]">{attr.type}</span>}
                <button onClick={() => removeAttribute(selectedEnt.id, i)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto text-xs">×</button>
              </div>
            ))}
          </div>
        )}

        {/* Diagram area */}
        <div className="bg-slate-900/80 rounded-lg border border-slate-700 min-h-[300px] p-4 relative overflow-auto">
          {entities.length === 0 ? (
            <div className="text-center text-slate-500 py-12">
              <p className="text-lg mb-2">Noch keine Entitäten</p>
              <p className="text-sm">Erstelle oben eine neue Entität oder lade das Beispiel!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-6 justify-center">
              {entities.map((entity) => (
                <div
                  key={entity.id}
                  onClick={() => setSelectedEntity(entity.id === selectedEntity ? null : entity.id)}
                  className={`bg-slate-800 rounded-lg border-2 cursor-pointer transition-all min-w-[180px] ${
                    selectedEntity === entity.id ? "ring-2 ring-white/50 shadow-lg" : "hover:scale-105"
                  }`}
                  style={{ borderColor: entity.color }}
                >
                  <div className="px-3 py-2 rounded-t-md flex items-center justify-between" style={{ backgroundColor: entity.color + "20" }}>
                    <span className="font-bold text-sm" style={{ color: entity.color }}>{entity.name}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeEntity(entity.id); }}
                      className="text-red-400 hover:text-red-300 text-xs opacity-60 hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="px-3 py-2">
                    {entity.attributes.length === 0 ? (
                      <p className="text-xs text-slate-500 italic">Keine Attribute</p>
                    ) : (
                      entity.attributes.map((attr, i) => (
                        <div key={i} className="text-xs mb-0.5 flex items-center gap-1">
                          {attr.isPK ? (
                            <>
                              <span className="text-yellow-400">🔑</span>
                              <span className="text-yellow-300 underline font-semibold">{attr.name}</span>
                            </>
                          ) : (
                            <span className="text-slate-300 pl-4">{attr.name}</span>
                          )}
                          {attr.type && <span className="text-purple-400/60 font-mono text-[10px] ml-1">{attr.type}</span>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Relationships */}
          {relationships.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <h5 className="text-xs font-semibold text-slate-400 mb-2">BEZIEHUNGEN</h5>
              <div className="flex flex-wrap gap-2">
                {relationships.map((rel) => {
                  const from = entities.find((e) => e.id === rel.from);
                  const to = entities.find((e) => e.id === rel.to);
                  if (!from || !to) return null;
                  return (
                    <div key={rel.id} className="bg-slate-800 rounded-lg px-3 py-2 border border-slate-600 text-xs flex items-center gap-2">
                      <span style={{ color: from.color }} className="font-semibold">{from.name}</span>
                      <span className="text-purple-400 font-mono">—{rel.label}→</span>
                      <span style={{ color: to.color }} className="font-semibold">{to.name}</span>
                      <span className="bg-purple-600/30 text-purple-300 px-1.5 py-0.5 rounded text-[10px] font-mono">{rel.cardinality}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
