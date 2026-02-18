import { useEffect, useState } from 'react';
import { env } from '@/config/env';

type Phase = 'enter' | 'hold' | 'exit' | 'done';

interface Props {
  children: React.ReactNode;
}

// Pre-compute hex grid positions (honeycomb pattern)
const hexCells = Array.from({ length: 24 }, (_, i) => {
  const col = i % 6;
  const row = Math.floor(i / 6);
  const offset = row % 2 === 0 ? 0 : 50;
  return {
    left: col * 100 + offset - 50,
    top: row * 90 - 20,
    delay: ((col + row) * 0.12),
  };
});

// Pre-compute floating orbs
const orbs = Array.from({ length: 12 }, (_, i) => {
  const seed = (i * 7919 + 104729) % 100000;
  const angle = (i / 12) * 360;
  const radius = 120 + (seed % 180);
  return {
    x: 50 + (radius * Math.cos((angle * Math.PI) / 180)) / 6,
    y: 50 + (radius * Math.sin((angle * Math.PI) / 180)) / 5,
    size: 4 + (seed % 8),
    delay: i * 0.15,
    duration: 3 + (seed % 400) / 100,
    hue: i % 3 === 0 ? 'bg-blue-400/40' : i % 3 === 1 ? 'bg-indigo-400/30' : 'bg-violet-400/25',
  };
});

// DNA helix dots (two interweaving strands)
const helixDots = Array.from({ length: 20 }, (_, i) => {
  const t = (i / 20) * Math.PI * 3;
  return {
    strand1X: 50 + Math.cos(t) * 18,
    strand1Y: 8 + (i / 20) * 84,
    strand2X: 50 + Math.cos(t + Math.PI) * 18,
    strand2Y: 8 + (i / 20) * 84,
    delay: i * 0.08,
  };
});

export function SplashScreen({ children }: Props) {
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 1600);
    const t2 = setTimeout(() => setPhase('exit'), 3200);
    const t3 = setTimeout(() => setPhase('done'), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return <>{children}</>;

  const name = env.APP_NAME;

  return (
    <>
      <div style={{ visibility: 'hidden', position: 'fixed', inset: 0 }}>{children}</div>

      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ${
          phase === 'exit' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{ background: 'linear-gradient(135deg, #f8faff 0%, #eef2ff 30%, #f0f4ff 60%, #faf8ff 100%)' }}
      >
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Animated hex grid (faint geometric backdrop) */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {hexCells.map((cell, i) => (
            <div
              key={i}
              className="splash-hex absolute"
              style={{
                left: `${cell.left}px`,
                top: `${cell.top}px`,
                animationDelay: `${cell.delay}s`,
              }}
            >
              <svg width="100" height="90" viewBox="0 0 100 90" className="opacity-[0.04]">
                <polygon
                  points="50,2 95,25 95,65 50,88 5,65 5,25"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="1"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* DNA double helix strands (left side) */}
        <div className="pointer-events-none absolute left-8 top-0 h-full w-16 overflow-hidden sm:left-16">
          {helixDots.map((dot, i) => (
            <div key={`helix-${i}`}>
              <div
                className="splash-helix-dot absolute h-1.5 w-1.5 rounded-full bg-blue-400/30"
                style={{
                  left: `${dot.strand1X - 34}%`,
                  top: `${dot.strand1Y}%`,
                  animationDelay: `${dot.delay}s`,
                }}
              />
              <div
                className="splash-helix-dot absolute h-1.5 w-1.5 rounded-full bg-indigo-400/25"
                style={{
                  left: `${dot.strand2X - 34}%`,
                  top: `${dot.strand2Y}%`,
                  animationDelay: `${dot.delay + 0.04}s`,
                }}
              />
              {i % 3 === 0 && (
                <div
                  className="splash-helix-connector absolute h-px bg-gradient-to-r from-blue-300/20 to-indigo-300/20"
                  style={{
                    left: `${Math.min(dot.strand1X, dot.strand2X) - 34}%`,
                    top: `${dot.strand1Y}%`,
                    width: `${Math.abs(dot.strand1X - dot.strand2X)}%`,
                    animationDelay: `${dot.delay + 0.1}s`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Floating orbs */}
        <div className="pointer-events-none absolute inset-0">
          {orbs.map((orb, i) => (
            <div
              key={i}
              className={`splash-orb absolute rounded-full blur-sm ${orb.hue}`}
              style={{
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                animationDelay: `${orb.delay}s`,
                animationDuration: `${orb.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Concentric ripple rings */}
        <div className="splash-ripple-1 absolute h-48 w-48 rounded-full border border-blue-200/50" />
        <div className="splash-ripple-2 absolute h-48 w-48 rounded-full border border-indigo-200/40" />
        <div className="splash-ripple-3 absolute h-48 w-48 rounded-full border border-violet-200/30" />

        {/* Main logo assembly */}
        <div className="relative mb-10">
          {/* Outer morphing shape */}
          <svg viewBox="0 0 200 200" width="180" height="180" className="splash-morph-ring">
            <defs>
              <linearGradient id="sRing1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#6366f1" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="sRing2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Primary arc */}
            <circle
              cx="100" cy="100" r="85"
              fill="none"
              stroke="url(#sRing1)"
              strokeWidth="2"
              strokeDasharray="180 355"
              strokeLinecap="round"
              filter="url(#softGlow)"
              className="splash-arc-draw"
            />

            {/* Secondary arc (counter) */}
            <circle
              cx="100" cy="100" r="72"
              fill="none"
              stroke="url(#sRing2)"
              strokeWidth="1.5"
              strokeDasharray="120 332"
              strokeLinecap="round"
              className="splash-arc-draw-reverse"
            />

            {/* Dashed orbit path */}
            <circle
              cx="100" cy="100" r="60"
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              className="splash-dashed-orbit"
            />

            {/* Orbiting satellites */}
            <circle cx="185" cy="100" r="4" fill="#3b82f6" className="splash-sat-1" />
            <circle cx="100" cy="28" r="3" fill="#8b5cf6" className="splash-sat-2" />
            <circle cx="40" cy="140" r="2.5" fill="#6366f1" className="splash-sat-3" />
          </svg>

          {/* Center glassmorphism circle + bolt */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="splash-center-glass flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/70 shadow-xl shadow-blue-500/10 backdrop-blur-md">
              <svg viewBox="0 0 24 24" width="40" height="40" className="splash-bolt-icon">
                <defs>
                  <linearGradient id="sBolt" x1="3" y1="2" x2="22" y2="24">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <path
                  d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"
                  fill="url(#sBolt)"
                  className="splash-bolt-fill"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand name — split reveal */}
        <div className="mb-3 flex items-baseline gap-0.5 overflow-hidden">
          {name.split('').map((char: string, i: number) => {
            const isAI = i >= name.indexOf('AI') && i < name.indexOf('AI') + 2 && name.includes('AI');
            return (
              <span
                key={i}
                className="splash-char-reveal"
                style={{
                  color: isAI ? '#3b82f6' : '#1e293b',
                  fontWeight: isAI ? 800 : 700,
                  fontSize: isAI ? '1.75rem' : '1.5rem',
                  animationDelay: `${1.6 + i * 0.06}s`,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </div>

        {/* Tagline with line decorations */}
        <div className="splash-tagline-wrap flex items-center gap-3">
          <div className="splash-line-left h-px w-12 bg-gradient-to-r from-transparent to-blue-300" />
          <p className="splash-tagline-text text-xs font-medium tracking-[0.25em] uppercase text-gray-400">
            Sprint Intelligence, Automated
          </p>
          <div className="splash-line-right h-px w-12 bg-gradient-to-l from-transparent to-indigo-300" />
        </div>

        {/* Segmented progress bar */}
        <div className="mt-12 flex gap-1">
          {[0, 1, 2, 3, 4].map((seg) => (
            <div key={seg} className="h-1 w-10 overflow-hidden rounded-full bg-blue-100">
              <div
                className="splash-seg-fill h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"
                style={{ animationDelay: `${0.3 + seg * 0.5}s` }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
