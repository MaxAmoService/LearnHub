"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  trail: { x: number; y: number }[];
}

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0;
    let h = 0;
    const pixelSize = 2;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    let lastShootingStar = 0;

    const resize = () => {
      w = window.innerWidth;
      h = document.documentElement.scrollHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const initStars = () => {
      stars.length = 0;
      const count = Math.floor((w * h) / 6000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.floor(Math.random() * w / pixelSize) * pixelSize,
          y: Math.floor(Math.random() * h / pixelSize) * pixelSize,
          size: pixelSize * (Math.random() < 0.15 ? 2 : 1),
          brightness: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    const spawnShootingStar = () => {
      const angle = Math.PI / 6 + Math.random() * Math.PI / 6;
      const speed = 0.6 + Math.random() * 0.8;
      shootingStars.push({
        x: Math.random() * w * 0.7,
        y: Math.random() * h * 0.25,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 200 + Math.random() * 150,
        size: pixelSize * 2,
        trail: [],
      });
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);

      const t = time / 1000;

      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.brightness * twinkle;
        const col = Math.floor(180 + alpha * 75);
        ctx.fillStyle = `rgba(${col}, ${col}, ${Math.min(255, col + 20)}, ${alpha})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      if (time - lastShootingStar > 5000 + Math.random() * 8000) {
        spawnShootingStar();
        lastShootingStar = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.trail.push({ x: s.x, y: s.y });
        if (s.trail.length > 30) s.trail.shift();
        s.x += s.vx;
        s.y += s.vy;
        s.life++;

        const progress = s.life / s.maxLife;
        const fadeOut = progress > 0.6 ? 1 - (progress - 0.6) / 0.4 : 1;

        if (fadeOut <= 0.01 || s.x > w + 100 || s.y > h + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        for (let t2 = 0; t2 < s.trail.length; t2++) {
          const trailAlpha = (t2 / s.trail.length) * 0.5 * fadeOut;
          const p = s.trail[t2];
          ctx.fillStyle = `rgba(200, 220, 255, ${trailAlpha})`;
          ctx.fillRect(
            Math.floor(p.x / pixelSize) * pixelSize,
            Math.floor(p.y / pixelSize) * pixelSize,
            pixelSize,
            pixelSize
          );
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fadeOut})`;
        ctx.fillRect(
          Math.floor(s.x / pixelSize) * pixelSize,
          Math.floor(s.y / pixelSize) * pixelSize,
          s.size,
          s.size
        );
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    animId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      initStars();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
