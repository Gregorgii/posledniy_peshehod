import { useEffect, useRef } from 'react';

interface SnowfallProps {
  /** Базовая плотность снега (1 = обычная). */
  density?: number;
  /** Множитель скорости падения. */
  speed?: number;
  /** true — снегопад усиливается и «заметает» кадр при переходе сцены. */
  sweep?: boolean;
}

interface Flake {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  alpha: number;
}

export default function Snowfall({
  density = 1,
  speed = 1,
  sweep = false,
}: SnowfallProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sweepRef = useRef(sweep);
  sweepRef.current = sweep;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let flakes: Flake[] = [];

    const makeFlakes = () => {
      const base = Math.round((width * height) / 14000);
      const count = Math.max(
        30,
        Math.round(base * density * (reduceMotion ? 0.4 : 1)),
      );
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 2.2,
        vy: 0.4 + Math.random() * 1.1,
        vx: -0.35 + Math.random() * 0.7,
        alpha: 0.35 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeFlakes();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const boost = sweepRef.current ? 3.2 : 1;
      for (const f of flakes) {
        f.y += f.vy * speed * boost;
        f.x += f.vx * speed * boost;
        if (f.y - f.r > height) {
          f.y = -f.r;
          f.x = Math.random() * width;
        }
        if (f.x < -f.r) f.x = width + f.r;
        if (f.x > width + f.r) f.x = -f.r;

        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = '#f4f6f8';
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * (sweepRef.current ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [density, speed]);

  return (
    <>
      <canvas ref={canvasRef} className="snowfall" aria-hidden="true" />
      <div
        className={`snow-veil${sweep ? ' is-sweeping' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
