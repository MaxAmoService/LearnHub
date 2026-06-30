"use client";

import confetti from "canvas-confetti";

export function fireConfetti() {
  // Links
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: 0.1, y: 0.6 },
    colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"],
  });
  // Rechts
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: 0.9, y: 0.6 },
    colors: ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"],
  });
}

export function fireBigConfetti() {
  const end = Date.now() + 1500;
  const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
