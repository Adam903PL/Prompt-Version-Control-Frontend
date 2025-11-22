'use client';

import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Separator } from '@/shared/components/ui/separator';
import { Eye, EyeOff, Github, Lock, Mail, ArrowRight } from 'lucide-react';
import { signIn } from '@/shared/lib/auth-client';

export default function LoginCardSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        ctx.fillStyle = `rgba(250,250,250,${p.o})`;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className="fixed inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 bg-black" />

      <style jsx global>{`
        @keyframes card-entrance {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            box-shadow:
              0 0 20px rgba(250, 250, 250, 0.1),
              0 0 40px rgba(250, 250, 250, 0.05);
          }
          50% {
            box-shadow:
              0 0 30px rgba(250, 250, 250, 0.2),
              0 0 60px rgba(250, 250, 250, 0.1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .card-animate {
          animation: card-entrance 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glow-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .glow-button:hover {
          animation: glow-pulse 2s ease-in-out infinite;
          transform: translateY(-2px);
        }

        .glow-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .glow-button:hover::before {
          opacity: 1;
        }

        .input-focus {
          transition: all 0.3s ease;
        }

        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 250, 250, 0.1);
        }

        .github-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .github-button::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(250, 250, 250, 0.1) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .github-button:hover::after {
          transform: translateX(100%);
        }

        .github-button:hover {
          border-color: rgba(250, 250, 250, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(250, 250, 250, 0.1);
        }

        .label-animate {
          transition: color 0.2s ease;
        }

        .label-animate:has(+ div input:focus) {
          color: rgb(250, 250, 250);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Centered Login Card */}
      <div className="h-full w-full grid place-items-center px-4">
        <Card className="card-animate w-full max-w-sm border-zinc-800 bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-zinc-900/60">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white">Welcome back</CardTitle>
            <CardDescription className="text-zinc-400">
              Sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-zinc-300 label-animate">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 transition-colors peer-focus:text-zinc-300" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 input-focus peer"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-zinc-300 label-animate">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className="pl-10 pr-10 bg-zinc-950 border-zinc-800 text-zinc-50 placeholder:text-zinc-600 input-focus"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-zinc-400 hover:text-zinc-200 transition-all hover:scale-110"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  className="border-zinc-700 data-[state=checked]:bg-zinc-50 data-[state=checked]:text-zinc-900 transition-all"
                />
                <Label
                  htmlFor="remember"
                  className="text-zinc-400 cursor-pointer hover:text-zinc-300 transition-colors"
                >
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm text-zinc-300 hover:text-zinc-100 transition-colors underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="glow-button w-full h-10 rounded-lg bg-zinc-50 text-zinc-900 hover:bg-zinc-200 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 border-2 border-zinc-900 border-t-transparent rounded-full loading-spinner mr-2" />
                  Loading...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="relative">
              <Separator className="bg-zinc-800" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-zinc-900/70 px-2 text-[11px] uppercase tracking-widest text-zinc-500">
                or
              </span>
            </div>

            <Button
              variant="outline"
              onClick={() => signIn.social({ provider: 'github' })}
              className="github-button w-full h-10 rounded-lg border-zinc-800 bg-zinc-950 text-zinc-50"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </CardContent>

          <CardFooter className="flex items-center justify-center text-sm text-zinc-400">
            Don&apos;t have an account?
            <a
              className="ml-1 text-zinc-200 hover:underline transition-all hover:text-white"
              href="/signup"
            >
              Create one
            </a>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
