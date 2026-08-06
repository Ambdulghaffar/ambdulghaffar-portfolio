"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 60;
const MAX_LINE_DISTANCE = 120;
const PARTICLE_SPEED = 0.15;
const ACCENT_RATIO = 0.12;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  accent: boolean;
}

function createParticles(width: number, height: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED,
    accent: Math.random() < ACCENT_RATIO,
  }));
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const rootStyles = getComputedStyle(document.documentElement);
    const lineColor = rootStyles.getPropertyValue("--border").trim();
    const dotColor = rootStyles.getPropertyValue("--muted-foreground").trim();
    const accentColor = rootStyles.getPropertyValue("--primary").trim();

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    function drawFrame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MAX_LINE_DISTANCE) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 0.3 * (1 - distance / MAX_LINE_DISTANCE);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        ctx.globalAlpha = particle.accent ? 0.85 : 0.5;
        ctx.fillStyle = particle.accent ? accentColor : dotColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.accent ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function step() {
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;
      }
      drawFrame();
      animationFrame = requestAnimationFrame(step);
    }

    function resize() {
      if (!ctx) return;
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height);
      if (prefersReducedMotion) drawFrame();
    }

    resize();
    if (!prefersReducedMotion) {
      animationFrame = requestAnimationFrame(step);
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(parent);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 size-full pointer-events-none"
    />
  );
}
