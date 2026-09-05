"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface Device {
  id: string;
  type: "pc" | "switch" | "router" | "server" | "accesspoint";
  name: string;
  x: number;
  y: number;
  ip?: string;
  subnet?: string;
  mac?: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface PingResult {
  from: string;
  to: string;
  success: boolean;
  hops: string[];
  time: number;
}

const DEVICE_ICONS: Record<string, { icon: string; color: string; label: string }> = {
  pc: { icon: "💻", color: "#3b82f6", label: "PC" },
  switch: { icon: "🔀", color: "#10b981", label: "Switch" },
  router: { icon: "🌐", color: "#f59e0b", label: "Router" },
  server: { icon: "🖥️", color: "#8b5cf6", label: "Server" },
  accesspoint: { icon: "📡", color: "#06b6d4", label: "Access Point" },
};

const TOPOLOGIES = {
  stern: {
    name: "Stern-Topologie",
    devices: [
      { id: "sw1", type: "switch" as const, name: "Switch", x: 300, y: 200 },
      { id: "pc1", type: "pc" as const, name: "PC-1", x: 100, y: 80 },
      { id: "pc2", type: "pc" as const, name: "PC-2", x: 500, y: 80 },
      { id: "pc3", type: "pc" as const, name: "PC-3", x: 100, y: 320 },
      { id: "pc4", type: "pc" as const, name: "PC-4", x: 500, y: 320 },
    ],
    connections: [
      { id: "c1", from: "sw1", to: "pc1" },
      { id: "c2", from: "sw1", to: "pc2" },
      { id: "c3", from: "sw1", to: "pc3" },
      { id: "c4", from: "sw1", to: "pc4" },
    ],
  },
  ring: {
    name: "Ring-Topologie",
    devices: [
      { id: "pc1", type: "pc" as const, name: "PC-1", x: 300, y: 60 },
      { id: "pc2", type: "pc" as const, name: "PC-2", x: 500, y: 200 },
      { id: "pc3", type: "pc" as const, name: "PC-3", x: 300, y: 340 },
      { id: "pc4", type: "pc" as const, name: "PC-4", x: 100, y: 200 },
    ],
    connections: [
      { id: "c1", from: "pc1", to: "pc2" },
      { id: "c2", from: "pc2", to: "pc3" },
      { id: "c3", from: "pc3", to: "pc4" },
      { id: "c4", from: "pc4", to: "pc1" },
    ],
  },
  mesh: {
    name: "Mesh-Topologie",
    devices: [
      { id: "pc1", type: "pc" as const, name: "PC-1", x: 150, y: 80 },
      { id: "pc2", type: "pc" as const, name: "PC-2", x: 450, y: 80 },
      { id: "pc3", type: "pc" as const, name: "PC-3", x: 150, y: 320 },
      { id: "pc4", type: "pc" as const, name: "PC-4", x: 450, y: 320 },
    ],
    connections: [
      { id: "c1", from: "pc1", to: "pc2" },
      { id: "c2", from: "pc1", to: "pc3" },
      { id: "c3", from: "pc1", to: "pc4" },
      { id: "c4", from: "pc2", to: "pc3" },
      { id: "c5", from: "pc2", to: "pc4" },
      { id: "c6", from: "pc3", to: "pc4" },
    ],
  },
};

let deviceCounter = 0;
function generateId() {
  return `dev-${++deviceCounter}`;
}

export function NetworkBuilder() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [draggingDevice, setDraggingDevice] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingDevice, setEditingDevice] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIp, setEditIp] = useState("");
  const [editSubnet, setEditSubnet] = useState("255.255.255.0");
  const [pingResult, setPingResult] = useState<PingResult | null>(null);
  const [pingFrom, setPingFrom] = useState<string | null>(null);
  const [mode, setMode] = useState<"drag" | "connect" | "ping">("drag");
  const svgRef = useRef<SVGSVGElement>(null);

  const loadTopology = (key: keyof typeof TOPOLOGIES) => {
    const topo = TOPOLOGIES[key];
    const devs = topo.devices.map((d) => ({
      ...d,
      mac: generateMac(),
    }));
    setDevices(devs);
    setConnections(topo.connections);
    setPingResult(null);
  };

  const addDevice = (type: Device["type"]) => {
    const id = generateId();
    const newDevice: Device = {
      id,
      type,
      name: `${DEVICE_ICONS[type].label}-${devices.length + 1}`,
      x: 150 + Math.random() * 300,
      y: 100 + Math.random() * 200,
      mac: generateMac(),
    };
    setDevices([...devices, newDevice]);
  };

  const removeDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
    setConnections(connections.filter((c) => c.from !== id && c.to !== id));
    if (selectedDevice === id) setSelectedDevice(null);
    if (editingDevice === id) setEditingDevice(null);
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    if (mode === "connect") {
      if (!connectingFrom) {
        setConnectingFrom(id);
      } else if (connectingFrom !== id) {
        const exists = connections.some(
          (c) =>
            (c.from === connectingFrom && c.to === id) ||
            (c.from === id && c.to === connectingFrom)
        );
        if (!exists) {
          setConnections([
            ...connections,
            { id: `c-${Date.now()}`, from: connectingFrom, to: id },
          ]);
        }
        setConnectingFrom(null);
      }
      return;
    }
    if (mode === "ping") {
      if (!pingFrom) {
        setPingFrom(id);
      } else {
        simulatePing(pingFrom, id);
        setPingFrom(null);
      }
      return;
    }
    const device = devices.find((d) => d.id === id);
    if (!device) return;
    setDraggingDevice(id);
    setDragOffset({ x: e.clientX - device.x, y: e.clientY - device.y });
    setSelectedDevice(id);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingDevice || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      setDevices((prev) =>
        prev.map((d) =>
          d.id === draggingDevice
            ? { ...d, x: e.clientX - rect.left - dragOffset.x + rect.left - e.clientX + e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
            : d
        )
      );
    },
    [draggingDevice, dragOffset]
  );

  const handleMouseMoveCanvas = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!draggingDevice || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setDevices((prev) =>
        prev.map((d) =>
          d.id === draggingDevice ? { ...d, x: x - 30, y: y - 30 } : d
        )
      );
    },
    [draggingDevice]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingDevice(null);
  }, []);

  const simulatePing = (fromId: string, toId: string) => {
    const from = devices.find((d) => d.id === fromId);
    const to = devices.find((d) => d.id === toId);
    if (!from || !to) return;

    const path = findPath(fromId, toId);
    const success = path.length > 0;
    const time = success ? Math.floor(Math.random() * 20 + 1) : 0;

    setPingResult({
      from: from.name,
      to: to.name,
      success,
      hops: path.map((id) => devices.find((d) => d.id === id)?.name || id),
      time,
    });
  };

  const findPath = (from: string, to: string): string[] => {
    const visited = new Set<string>();
    const queue: string[][] = [[from]];
    while (queue.length > 0) {
      const path = queue.shift()!;
      const current = path[path.length - 1];
      if (current === to) return path;
      if (visited.has(current)) continue;
      visited.add(current);
      const neighbors = connections
        .filter((c) => c.from === current || c.to === current)
        .map((c) => (c.from === current ? c.to : c.from));
      for (const n of neighbors) {
        if (!visited.has(n)) {
          queue.push([...path, n]);
        }
      }
    }
    return [];
  };

  const startEdit = (id: string) => {
    const d = devices.find((dev) => dev.id === id);
    if (!d) return;
    setEditingDevice(id);
    setEditName(d.name);
    setEditIp(d.ip || "");
    setEditSubnet(d.subnet || "255.255.255.0");
  };

  const saveEdit = () => {
    if (!editingDevice) return;
    setDevices((prev) =>
      prev.map((d) =>
        d.id === editingDevice
          ? { ...d, name: editName, ip: editIp, subnet: editSubnet }
          : d
      )
    );
    setEditingDevice(null);
  };

  const exportJSON = () => {
    const data = { devices, connections };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "network-topology.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDevicePos = (id: string) => devices.find((d) => d.id === id);

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">🌐 Network Builder</h3>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
          {(["pc", "switch", "router", "server", "accesspoint"] as const).map((type) => (
            <button
              key={type}
              onClick={() => addDevice(type)}
              className="px-3 py-1.5 rounded text-sm bg-slate-600 hover:bg-slate-500 text-white transition-colors"
              title={`${DEVICE_ICONS[type].label} hinzufügen`}
            >
              {DEVICE_ICONS[type].icon}
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
          {(["drag", "connect", "ping"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setConnectingFrom(null); setPingFrom(null); }}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                mode === m ? "bg-blue-600 text-white" : "bg-slate-600 text-slate-300 hover:bg-slate-500"
              }`}
            >
              {m === "drag" ? "↕️ Verschieben" : m === "connect" ? "🔗 Verbinden" : "📡 Ping"}
            </button>
          ))}
        </div>

        <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
          {(Object.keys(TOPOLOGIES) as (keyof typeof TOPOLOGIES)[]).map((key) => (
            <button
              key={key}
              onClick={() => loadTopology(key)}
              className="px-3 py-1.5 rounded text-sm bg-slate-600 hover:bg-slate-500 text-white transition-colors"
            >
              {TOPOLOGIES[key].name}
            </button>
          ))}
        </div>

        <button
          onClick={() => { setDevices([]); setConnections([]); setPingResult(null); }}
          className="px-3 py-1.5 rounded text-sm bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors"
        >
          🗑️ Leeren
        </button>
        <button
          onClick={exportJSON}
          className="px-3 py-1.5 rounded text-sm bg-green-600/20 hover:bg-green-600/40 text-green-400 transition-colors"
        >
          📥 Export JSON
        </button>
      </div>

      {/* Status */}
      <div className="text-xs text-slate-400 mb-2">
        {mode === "drag" && "↕️ Gerät klicken und verschieben. Doppelklick zum Konfigurieren."}
        {mode === "connect" && (connectingFrom ? `🔗 Zweites Gerät anklicken für Verbindung (${devices.find(d => d.id === connectingFrom)?.name})` : "🔗 Erstes Gerät anklicken")}
        {mode === "ping" && (pingFrom ? `📡 Zweites Gerät für Ping anklicken (${devices.find(d => d.id === pingFrom)?.name})` : "📡 Quell-Gerät anklicken")}
      </div>

      {/* Canvas */}
      <svg
        ref={svgRef}
        className="w-full bg-slate-900 rounded-lg border border-slate-700 cursor-crosshair"
        style={{ height: 420 }}
        onMouseMove={handleMouseMoveCanvas}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Connections */}
        {connections.map((conn) => {
          const fromPos = getDevicePos(conn.from);
          const toPos = getDevicePos(conn.to);
          if (!fromPos || !toPos) return null;
          const isInPingPath =
            pingResult?.success &&
            pingResult.hops.includes(fromPos.name) &&
            pingResult.hops.includes(toPos.name);
          return (
            <line
              key={conn.id}
              x1={fromPos.x + 30}
              y1={fromPos.y + 30}
              x2={toPos.x + 30}
              y2={toPos.y + 30}
              stroke={isInPingPath ? "#22c55e" : "#475569"}
              strokeWidth={isInPingPath ? 3 : 2}
              strokeDasharray={isInPingPath ? "8 4" : "none"}
            />
          );
        })}

        {/* Devices */}
        {devices.map((device) => {
          const info = DEVICE_ICONS[device.type];
          const isSelected = selectedDevice === device.id;
          const isPingSource = pingFrom === device.id;
          return (
            <g
              key={device.id}
              onMouseDown={(e) => handleMouseDown(device.id, e)}
              onDoubleClick={() => mode === "drag" && startEdit(device.id)}
              style={{ cursor: "grab" }}
            >
              <rect
                x={device.x}
                y={device.y}
                width={60}
                height={60}
                rx={8}
                fill={isSelected ? info.color : isPingSource ? "#22c55e" : "#1e293b"}
                stroke={isSelected ? "#fff" : info.color}
                strokeWidth={isSelected ? 3 : 2}
              />
              <text x={device.x + 30} y={device.y + 28} textAnchor="middle" fontSize={22}>
                {info.icon}
              </text>
              <text
                x={device.x + 30}
                y={device.y + 50}
                textAnchor="middle"
                fontSize={9}
                fill="#94a3b8"
              >
                {device.name}
              </text>
              {device.ip && (
                <text
                  x={device.x + 30}
                  y={device.y - 6}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#60a5fa"
                >
                  {device.ip}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Edit Panel */}
      {editingDevice && (
        <div className="mt-3 p-3 bg-slate-700 rounded-lg border border-slate-600">
          <h4 className="text-sm font-semibold text-white mb-2">⚙️ Gerät konfigurieren</h4>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400">Name</label>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-2 py-1 bg-slate-600 rounded text-white text-sm border border-slate-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">IP-Adresse</label>
              <input
                value={editIp}
                onChange={(e) => setEditIp(e.target.value)}
                placeholder="192.168.1.1"
                className="w-full px-2 py-1 bg-slate-600 rounded text-white text-sm border border-slate-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Subnetzmaske</label>
              <input
                value={editSubnet}
                onChange={(e) => setEditSubnet(e.target.value)}
                className="w-full px-2 py-1 bg-slate-600 rounded text-white text-sm border border-slate-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors"
              >
                ✅ Speichern
              </button>
              <button
                onClick={() => removeDevice(editingDevice)}
                className="px-3 py-1 bg-red-600/30 hover:bg-red-600/50 text-red-400 rounded text-sm transition-colors"
              >
                🗑️
              </button>
              <button
                onClick={() => setEditingDevice(null)}
                className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white rounded text-sm transition-colors"
              >
                ❌
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ping Result */}
      {pingResult && (
        <div className={`mt-3 p-3 rounded-lg border ${pingResult.success ? "bg-green-900/30 border-green-700" : "bg-red-900/30 border-red-700"}`}>
          <h4 className="text-sm font-semibold text-white mb-1">
            {pingResult.success ? "✅ Ping erfolgreich" : "❌ Ping fehlgeschlagen"}
          </h4>
          {pingResult.success ? (
            <p className="text-xs text-slate-300">
              {pingResult.from} → {pingResult.to}: Zeit={pingResult.time}ms, Hops={pingResult.hops.join(" → ")}
            </p>
          ) : (
            <p className="text-xs text-slate-300">
              {pingResult.from} → {pingResult.to}: Keine Route gefunden
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function generateMac(): string {
  const hex = "0123456789ABCDEF";
  let mac = "";
  for (let i = 0; i < 6; i++) {
    if (i > 0) mac += ":";
    mac += hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)];
  }
  return mac;
}
