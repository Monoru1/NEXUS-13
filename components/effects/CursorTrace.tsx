'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  age: number;
  maxAge: number;
};

export function CursorTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouseMove);

    const render = (now: number) => {
      rafRef.current = requestAnimationFrame(render);

      // Spawn new particle at cursor position, throttled
      if (now - lastSpawnRef.current > 30) {
        const { x, y } = mouseRef.current;
        if (x > -100) {
          particlesRef.current.push({ x, y, age: 0, maxAge: 18 });
          lastSpawnRef.current = now;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.age < p.maxAge);

      for (const p of particlesRef.current) {
        const t = 1 - p.age / p.maxAge;
        const alpha = t * 0.35;
        const radius = (1 - t) * 3 + 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197, 255, 60, ${alpha})`;
        ctx.fill();

        p.age++;
      }
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none"
      aria-hidden
    />
  );
}
