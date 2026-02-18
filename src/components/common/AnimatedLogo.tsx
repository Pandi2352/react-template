import { useEffect, useState } from 'react';

interface Props {
  size?: number;
  className?: string;
}

export function AnimatedLogo({ size = 64, className = '' }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const r = size / 2;
  const stroke = size * 0.04;
  const orbitR = r * 0.62;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="absolute inset-0">
        {/* Outer ring pulse */}
        <circle
          cx={r}
          cy={r}
          r={r - stroke * 2}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          className="origin-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.8s ease-out',
            animation: mounted ? 'logoSpin 8s linear infinite' : 'none',
          }}
          strokeDasharray={`${(r - stroke * 2) * 1.2} ${(r - stroke * 2) * 0.5}`}
          strokeLinecap="round"
        />

        {/* Inner orbit ring */}
        <circle
          cx={r}
          cy={r}
          r={orbitR}
          fill="none"
          stroke="url(#orbitGrad)"
          strokeWidth={stroke * 0.7}
          style={{
            opacity: mounted ? 0.5 : 0,
            transition: 'opacity 1s ease-out 0.3s',
            animation: mounted ? 'logoSpin 12s linear infinite reverse' : 'none',
          }}
          strokeDasharray={`${orbitR * 0.8} ${orbitR * 1.5}`}
          strokeLinecap="round"
        />

        {/* Orbiting dot 1 */}
        <circle
          cx={r + orbitR}
          cy={r}
          r={size * 0.035}
          fill="#3b82f6"
          className="origin-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.5s',
            animation: mounted ? 'logoSpin 4s linear infinite' : 'none',
            transformOrigin: `${r}px ${r}px`,
          }}
        />

        {/* Orbiting dot 2 */}
        <circle
          cx={r - orbitR * 0.7}
          cy={r - orbitR * 0.7}
          r={size * 0.025}
          fill="#6366f1"
          className="origin-center"
          style={{
            opacity: mounted ? 0.8 : 0,
            transition: 'opacity 0.6s ease-out 0.7s',
            animation: mounted ? 'logoSpin 6s linear infinite reverse' : 'none',
            transformOrigin: `${r}px ${r}px`,
          }}
        />

        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center bolt icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative text-primary"
        style={{
          width: size * 0.35,
          height: size * 0.35,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'scale(1)' : 'scale(0.5)',
          transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
        }}
      >
        <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" fill="url(#boltGrad)" stroke="none" />
        <defs>
          <linearGradient id="boltGrad" x1="3" y1="2" x2="22" y2="24">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
