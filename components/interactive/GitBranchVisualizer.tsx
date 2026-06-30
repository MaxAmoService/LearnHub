"use client";

import { useState } from "react";
import { GitBranch, GitMerge, GitCommit, Plus, RotateCcw, Trash2 } from "lucide-react";

interface Commit {
  id: string;
  message: string;
  branch: string;
  parent: string | null;
  x: number;
  y: number;
}

interface Branch {
  name: string;
  color: string;
  head: string | null;
}

export default function GitBranchVisualizer() {
  const [commits, setCommits] = useState<Commit[]>([
    { id: "c1", message: "Initial commit", branch: "main", parent: null, x: 200, y: 40 },
  ]);
  const [branches, setBranches] = useState<Branch[]>([
    { name: "main", color: "#10B981", head: "c1" },
  ]);
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [commitMessage, setCommitMessage] = useState("");
  const [newBranchName, setNewBranchName] = useState("");
  const [mergeSource, setMergeSource] = useState("");

  const getNextId = () => `c${commits.length + 1}`;

  const getLastCommit = (branchName: string) => {
    const branch = branches.find((b) => b.name === branchName);
    if (!branch || !branch.head) return null;
    return commits.find((c) => c.id === branch.head) || null;
  };

  const getBranchIndex = (branchName: string) =>
    branches.findIndex((b) => b.name === branchName);

  const addCommit = () => {
    if (!commitMessage.trim()) return;

    const lastCommit = getLastCommit(selectedBranch);
    const branch = branches.find((b) => b.name === selectedBranch);
    if (!branch) return;

    // Bottom-up: y increases downward, newest commits at bottom
    const baseY = lastCommit ? lastCommit.y + 80 : 40;
    const branchIdx = getBranchIndex(selectedBranch);
    const baseX = 100 + branchIdx * 140;

    const newCommit: Commit = {
      id: getNextId(),
      message: commitMessage,
      branch: selectedBranch,
      parent: lastCommit?.id || null,
      x: baseX,
      y: baseY,
    };

    setCommits([...commits, newCommit]);
    setBranches(
      branches.map((b) =>
        b.name === selectedBranch ? { ...b, head: newCommit.id } : b
      )
    );
    setCommitMessage("");
  };

  const createBranch = () => {
    if (!newBranchName.trim()) return;
    if (branches.find((b) => b.name === newBranchName)) return;

    const lastCommit = getLastCommit(selectedBranch);
    const colors = ["#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#06B6D4"];
    const newBranch: Branch = {
      name: newBranchName,
      color: colors[branches.length % colors.length],
      head: lastCommit?.id || null,
    };

    setBranches([...branches, newBranch]);
    setSelectedBranch(newBranchName);
    setNewBranchName("");
  };

  const mergeBranch = () => {
    if (!mergeSource || mergeSource === selectedBranch) return;

    const sourceBranch = branches.find((b) => b.name === mergeSource);
    const targetBranch = branches.find((b) => b.name === selectedBranch);
    if (!sourceBranch || !targetBranch) return;

    const sourceCommit = sourceBranch.head
      ? commits.find((c) => c.id === sourceBranch.head)
      : null;
    const targetCommit = targetBranch.head
      ? commits.find((c) => c.id === targetBranch.head)
      : null;

    if (!sourceCommit) return;

    const branchIdx = getBranchIndex(selectedBranch);
    const baseY = Math.max(
      sourceCommit.y,
      targetCommit?.y ?? 0
    ) + 80;

    const newCommit: Commit = {
      id: getNextId(),
      message: `Merge ${mergeSource} into ${selectedBranch}`,
      branch: selectedBranch,
      parent: targetCommit?.id || null,
      x: 100 + branchIdx * 140,
      y: baseY,
    };

    setCommits([...commits, newCommit]);
    setBranches(
      branches.map((b) =>
        b.name === selectedBranch ? { ...b, head: newCommit.id } : b
      )
    );
    setMergeSource("");
  };

  const deleteBranch = (name: string) => {
    if (name === "main") return;
    setBranches(branches.filter((b) => b.name !== name));
    if (selectedBranch === name) setSelectedBranch("main");
  };

  const reset = () => {
    setCommits([{ id: "c1", message: "Initial commit", branch: "main", parent: null, x: 200, y: 40 }]);
    setBranches([{ name: "main", color: "#10B981", head: "c1" }]);
    setSelectedBranch("main");
  };

  const getBranchColor = (branchName: string) =>
    branches.find((b) => b.name === branchName)?.color || "#6B7280";

  // Calculate SVG dimensions based on content
  const maxY = commits.length > 0 ? Math.max(...commits.map((c) => c.y)) : 0;
  const svgHeight = Math.max(maxY + 100, 300);
  const svgWidth = Math.max(branches.length * 140 + 200, 400);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-green-400" />
        Git Branch Visualizer
      </h3>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Commit */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
            <GitCommit className="w-4 h-4" /> Commit
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit-Nachricht..."
              className="flex-1 bg-gray-700 text-white text-sm rounded px-3 py-2 border border-gray-600 focus:border-green-500 focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && addCommit()}
            />
            <button
              onClick={addCommit}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Branch: <span className="text-white font-mono">{selectedBranch}</span>
          </p>
        </div>

        {/* Branch */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
            <GitBranch className="w-4 h-4" /> Branch erstellen
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={newBranchName}
              onChange={(e) => setNewBranchName(e.target.value)}
              placeholder="Branch-Name..."
              className="flex-1 bg-gray-700 text-white text-sm rounded px-3 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && createBranch()}
            />
            <button
              onClick={createBranch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Merge */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
            <GitMerge className="w-4 h-4" /> Merge
          </h4>
          <div className="flex gap-2">
            <select
              value={mergeSource}
              onChange={(e) => setMergeSource(e.target.value)}
              className="flex-1 bg-gray-700 text-white text-sm rounded px-3 py-2 border border-gray-600 focus:border-purple-500 focus:outline-none"
            >
              <option value="">Quell-Branch...</option>
              {branches
                .filter((b) => b.name !== selectedBranch)
                .map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name}
                  </option>
                ))}
            </select>
            <button
              onClick={mergeBranch}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
            >
              <GitMerge className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Branch Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {branches.map((branch) => (
          <button
            key={branch.name}
            onClick={() => setSelectedBranch(branch.name)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedBranch === branch.name
                ? "text-white ring-2 ring-white/20"
                : "text-gray-300 hover:text-white"
            }`}
            style={{
              backgroundColor:
                selectedBranch === branch.name
                  ? branch.color + "33"
                  : branch.color + "15",
              borderColor: branch.color,
              borderWidth: "1px",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: branch.color }}
            />
            {branch.name}
            {branch.name !== "main" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBranch(branch.name);
                }}
                className="ml-1 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </button>
        ))}
        <button
          onClick={reset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 transition-all"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Commit Graph — bottom-up orientation */}
      <div className="bg-gray-800 rounded-lg p-4 overflow-auto min-h-[200px]">
        <svg width={svgWidth} height={svgHeight}>
          {/* Draw connections */}
          {commits.map((commit) => {
            if (!commit.parent) return null;
            const parent = commits.find((c) => c.id === commit.parent);
            if (!parent) return null;
            const isMerge = commit.message.startsWith("Merge");
            return (
              <line
                key={`${commit.id}-${commit.parent}`}
                x1={parent.x}
                y1={parent.y}
                x2={commit.x}
                y2={commit.y}
                stroke={getBranchColor(commit.branch)}
                strokeWidth="2.5"
                strokeDasharray={isMerge ? "6,4" : "none"}
              />
            );
          })}

          {/* Draw merge cross-connections */}
          {commits.map((commit) => {
            if (!commit.message.startsWith("Merge")) return null;
            // Find the source branch head that was merged
            const mergeMatch = commit.message.match(/Merge (\S+) into/);
            if (!mergeMatch) return null;
            const sourceName = mergeMatch[1];
            const sourceBranch = branches.find((b) => b.name === sourceName);
            if (!sourceBranch?.head) return null;
            const sourceCommit = commits.find((c) => c.id === sourceBranch.head);
            if (!sourceCommit) return null;
            return (
              <line
                key={`merge-cross-${commit.id}`}
                x1={sourceCommit.x}
                y1={sourceCommit.y}
                x2={commit.x}
                y2={commit.y}
                stroke={getBranchColor(sourceName)}
                strokeWidth="2"
                strokeDasharray="6,4"
                opacity="0.5"
              />
            );
          })}

          {/* Branch labels at top */}
          {branches.map((branch, i) => (
            <text
              key={`label-${branch.name}`}
              x={100 + i * 140}
              y={20}
              textAnchor="middle"
              fill={branch.color}
              fontSize="11"
              fontWeight="bold"
            >
              {branch.name}
            </text>
          ))}

          {/* Draw commits */}
          {commits.map((commit) => (
            <g key={commit.id}>
              <circle
                cx={commit.x}
                cy={commit.y}
                r="14"
                fill={getBranchColor(commit.branch)}
                stroke="#1F2937"
                strokeWidth="2.5"
              />
              <text
                x={commit.x}
                y={commit.y + 4}
                textAnchor="middle"
                fill="white"
                fontSize="9"
                fontWeight="bold"
              >
                {commit.id}
              </text>
              <text
                x={commit.x + 22}
                y={commit.y + 4}
                textAnchor="start"
                fill="#D1D5DB"
                fontSize="10"
              >
                {commit.message.length > 22
                  ? commit.message.slice(0, 22) + "…"
                  : commit.message}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Commit
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-0.5 bg-gray-400" />
          Parent-Verbindung
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 h-0.5 bg-gray-400" style={{ borderTop: "2px dashed #9CA3AF" }} />
          Merge
        </div>
      </div>
    </div>
  );
}
