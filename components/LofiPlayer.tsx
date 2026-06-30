"use client";

import { useState, useEffect, useRef } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

const LOFI_STREAM = "https://play.streamafrica.net/lofiradio";
const STORAGE_KEY = "learnhub-lofi";
const VOL_KEY = "learnhub-lofi-vol";

let globalAudio: HTMLAudioElement | null = null;

function getAudio(): HTMLAudioElement {
  if (!globalAudio) {
    globalAudio = new Audio(LOFI_STREAM);
    globalAudio.crossOrigin = "anonymous";
    globalAudio.volume = parseFloat(localStorage.getItem(VOL_KEY) || "0.3");
  }
  return globalAudio;
}

export default function LofiPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVol, setShowVol] = useState(false);
  const volRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedVol = localStorage.getItem(VOL_KEY);
    if (savedVol) setVolume(parseFloat(savedVol));
    if (saved === "on") {
      const audio = getAudio();
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (volRef.current && !volRef.current.contains(e.target as Node)) {
        setShowVol(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "off");
    } else {
      audio.play().then(() => {
        setPlaying(true);
        localStorage.setItem(STORAGE_KEY, "on");
      }).catch(() => {});
    }
  };

  const changeVolume = (v: number) => {
    setVolume(v);
    localStorage.setItem(VOL_KEY, String(v));
    if (globalAudio) globalAudio.volume = v;
  };

  return (
    <div className="fixed top-3 right-3 z-50 flex items-center gap-1" ref={volRef}>
      {/* Volume Panel */}
      {showVol && (
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/50 rounded-xl px-3 py-2 shadow-lg">
          <button onClick={() => changeVolume(0)} className="text-slate-500 hover:text-slate-300">
            <VolumeX className="w-3 h-3" />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-20 h-1 accent-violet-500 cursor-pointer"
          />
          <Volume2 className="w-3 h-3 text-slate-500" />
          <span className="text-[9px] text-slate-500 w-6 text-right">{Math.round(volume * 100)}</span>
        </div>
      )}

      {/* Volume Toggle */}
      {playing && (
        <button
          onClick={() => setShowVol(!showVol)}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all"
          title="Lautstärke"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Play/Pause */}
      <button
        onClick={toggle}
        className={`relative p-2 rounded-xl transition-all duration-200 ${
          playing
            ? "text-violet-400 bg-violet-500/15 border border-violet-500/30 shadow-sm shadow-violet-500/10"
            : "text-slate-600 hover:text-slate-400 hover:bg-slate-800/60"
        }`}
        title={playing ? "Lofi ausschalten" : "Lofi einschalten"}
      >
        <Music className="w-4 h-4" />
        {playing && (
          <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        )}
      </button>
    </div>
  );
}
