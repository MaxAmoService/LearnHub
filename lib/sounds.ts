"use client";

const audioCtx = typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

let enabled = true;

export function setSoundEnabled(v: boolean) {
  enabled = v;
  localStorage.setItem("learnhub-sound", v ? "1" : "0");
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("learnhub-sound") !== "0";
}

function playTone(freq: number, duration: number, type: OscillatorType = "sine", volume = 0.15) {
  if (!audioCtx || !enabled) return;
  try {
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {}
}

export function playCorrect() {
  playTone(523, 0.1, "sine", 0.12);
  setTimeout(() => playTone(659, 0.1, "sine", 0.12), 80);
  setTimeout(() => playTone(784, 0.15, "sine", 0.1), 160);
}

export function playWrong() {
  playTone(200, 0.15, "sawtooth", 0.08);
  setTimeout(() => playTone(180, 0.2, "sawtooth", 0.06), 120);
}

export function playComplete() {
  playTone(523, 0.1, "sine", 0.1);
  setTimeout(() => playTone(659, 0.1, "sine", 0.1), 100);
  setTimeout(() => playTone(784, 0.1, "sine", 0.1), 200);
  setTimeout(() => playTone(1047, 0.2, "sine", 0.12), 300);
}

export function playLevelUp() {
  const notes = [523, 659, 784, 1047, 1319];
  notes.forEach((f, i) => setTimeout(() => playTone(f, 0.15, "sine", 0.1), i * 80));
}

export function playClick() {
  playTone(800, 0.05, "sine", 0.06);
}

export function playFlip() {
  playTone(400, 0.08, "triangle", 0.08);
  setTimeout(() => playTone(600, 0.06, "triangle", 0.06), 50);
}
