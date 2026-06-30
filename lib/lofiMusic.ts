"use client";

let ctx: AudioContext | null = null;
let isPlaying = false;
let nodes: { stop: () => void }[] = [];

function getCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function createNoise(ctx: AudioContext): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function startLofi() {
  if (isPlaying) return;
  const c = getCtx();
  isPlaying = true;

  // Master gain
  const master = c.createGain();
  master.gain.value = 0.12;
  master.connect(c.destination);

  // Low-pass filter for lofi warmth
  const lpf = c.createBiquadFilter();
  lpf.type = "lowpass";
  lpf.frequency.value = 800;
  lpf.Q.value = 0.7;
  lpf.connect(master);

  // Vinyl crackle noise
  const noise = createNoise(c);
  const noiseGain = c.createGain();
  noiseGain.gain.value = 0.04;
  const noiseFilter = c.createBiquadFilter();
  noiseFilter.type = "bandpass";
  noiseFilter.frequency.value = 3000;
  noiseFilter.Q.value = 2;
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();
  nodes.push({ stop: () => { noise.stop(); noiseGain.gain.value = 0; } });

  // Ambient pad (low chord)
  const chords = [
    [261.63, 329.63, 392.00], // C major
    [293.66, 369.99, 440.00], // D major
    [246.94, 311.13, 369.99], // B minor
    [220.00, 277.18, 329.63], // A minor
  ];
  let chordIdx = 0;
  const padOscs: OscillatorNode[] = [];
  const padGain = c.createGain();
  padGain.gain.value = 0.06;
  padGain.connect(lpf);

  function playChord() {
    const chord = chords[chordIdx % chords.length];
    padOscs.forEach(o => { try { o.stop(); } catch {} });
    padOscs.length = 0;
    chord.forEach(freq => {
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq / 2; // One octave lower for warmth
      osc.connect(padGain);
      osc.start();
      padOscs.push(osc);
    });
    chordIdx++;
  }

  playChord();
  const chordInterval = setInterval(playChord, 8000);
  nodes.push({ stop: () => { clearInterval(chordInterval); padOscs.forEach(o => { try { o.stop(); } catch {} }); padGain.gain.value = 0; } });

  // Subtle bass pulse
  const bassOsc = c.createOscillator();
  bassOsc.type = "sine";
  bassOsc.frequency.value = 55; // A1
  const bassGain = c.createGain();
  bassGain.gain.value = 0.05;
  const bassLfo = c.createOscillator();
  bassLfo.type = "sine";
  bassLfo.frequency.value = 0.25; // Slow pulse
  const bassLfoGain = c.createGain();
  bassLfoGain.gain.value = 0.03;
  bassLfo.connect(bassLfoGain);
  bassLfoGain.connect(bassGain.gain);
  bassOsc.connect(bassGain);
  bassGain.connect(lpf);
  bassOsc.start();
  bassLfo.start();
  nodes.push({ stop: () => { bassOsc.stop(); bassLfo.stop(); bassGain.gain.value = 0; } });
}

function stopLofi() {
  nodes.forEach(n => { try { n.stop(); } catch {} });
  nodes = [];
  isPlaying = false;
}

export function toggleLofi(): boolean {
  if (isPlaying) {
    stopLofi();
    return false;
  } else {
    startLofi();
    return true;
  }
}

export function isLofiPlaying(): boolean {
  return isPlaying;
}
