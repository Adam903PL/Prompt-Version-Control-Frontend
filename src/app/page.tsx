'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();

    type P = { x: number; y: number; v: number; o: number };
    let ps: P[] = [];
    let raf = 0;

    const make = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: Math.random() * 0.25 + 0.05,
      o: Math.random() * 0.35 + 0.15,
    });

    const init = () => {
      ps = [];
      const count = Math.floor((canvas.width * canvas.height) / 9000);
      for (let i = 0; i < count; i++) ps.push(make());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ps.forEach((p) => {
        p.y -= p.v;
        if (p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 40;
          p.v = Math.random() * 0.25 + 0.05;
          p.o = Math.random() * 0.35 + 0.15;
        }
        // white streaks for subtle glassy particles
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fillRect(p.x, p.y, 0.7, 2.2);
      });
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      setSize();
      init();
    };

    window.addEventListener('resize', onResize);
    init();
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 text-white">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 w-full max-w-md text-center bg-white/6 bg-clip-padding backdrop-blur-lg border border-white/12 rounded-2xl p-8 shadow-xl ring-1 ring-white/6">
        <h1 className="text-3xl font-semibold mb-6 text-white">Welcome</h1>
        <p className="mb-6 text-sm text-neutral-200">
          Sign in or create an account to continue.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/sign-in"
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg shadow-sm transition-colors duration-150 border border-white/6"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-2 bg-transparent border border-white/12 text-white/90 rounded-lg hover:bg-white/5 transition-colors duration-150"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
