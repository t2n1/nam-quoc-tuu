
import React, { useEffect, useRef, useState } from 'react';

const R = 110;
const CX = 140;
const CY = 140;
const CIRCUM = 2 * Math.PI * R;

const TICKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * 30 - 90) * (Math.PI / 180);
  const inner = i % 3 === 0 ? R - 12 : R - 7;
  return {
    x1: CX + inner * Math.cos(angle),
    y1: CY + inner * Math.sin(angle),
    x2: CX + (R - 2) * Math.cos(angle),
    y2: CY + (R - 2) * Math.sin(angle),
    major: i % 3 === 0,
    threshold: (i / 12) * 100,
  };
});

type Particle = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number };

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const arcRef    = useRef<SVGCircleElement>(null);
  const pctRef    = useRef<HTMLSpanElement>(null);
  const tickRefs  = useRef<(SVGLineElement | null)[]>([]);
  const logoRef   = useRef<HTMLDivElement>(null);

  const glowRef      = useRef<HTMLDivElement>(null);
  const ringWrapRef  = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particles    = useRef<Particle[]>([]);
  const particleRaf  = useRef<number>(0);

  // ── Progress animation ─────────────────────────────────────────
  useEffect(() => {
    const duration = 5200;
    const start = performance.now();
    let rafId: number;
    let completed = false;

    const complete = () => {
      if (completed) return;
      completed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      // Snap to 100%
      if (arcRef.current) arcRef.current.style.strokeDashoffset = '0';
      if (pctRef.current) pctRef.current.textContent = '100';
      tickRefs.current.forEach((el, i) => {
        if (!el) return;
        el.setAttribute('stroke', TICKS[i].major ? '#F59E0B' : 'rgba(245,158,11,0.6)');
        el.setAttribute('stroke-width', TICKS[i].major ? '1.5' : '0.7');
      });
      setTimeout(() => { setFadeOut(true); setTimeout(onComplete, 700); }, 300);
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 2.8);
      const p = Math.round(eased * 100);

      if (arcRef.current)
        arcRef.current.style.strokeDashoffset = String(CIRCUM * (1 - p / 100));
      if (pctRef.current)
        pctRef.current.textContent = String(p);

      tickRefs.current.forEach((el, i) => {
        if (!el) return;
        const lit = p >= TICKS[i].threshold;
        el.setAttribute('stroke', lit ? '#F59E0B' : 'rgba(255,255,255,0.12)');
        el.setAttribute('stroke-width', lit && TICKS[i].major ? '1.5' : '0.7');
      });

      if (logoRef.current) {
        const pulse = 1 + Math.sin(now / 1200) * 0.018;
        logoRef.current.style.transform = `scale(${pulse})`;
      }

      if (t < 1) { rafId = requestAnimationFrame(tick); }
      else { complete(); }
    };

    rafId = requestAnimationFrame(tick);

    // Fallback: nếu rAF bị kẹt (mobile low-power, background tab...), force complete
    const fallbackTimer = setTimeout(complete, duration + 1200);

    // Nếu user quay lại sau khi background app, skip thẳng đến 100%
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') complete();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(fallbackTimer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [onComplete]);

  // ── Particle canvas loop ───────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter(p => p.life > 0);
      for (const p of particles.current) {
        p.x += p.vx; p.y += p.vy;
        p.vy -= 0.04; p.vx *= 0.97;
        p.life -= 1;
        ctx.globalAlpha = (p.life / p.maxLife) * 0.7;
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      particleRaf.current = requestAnimationFrame(draw);
    };
    particleRaf.current = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(particleRaf.current); window.removeEventListener('resize', resize); };
  }, []);

  // ── Mouse move ─────────────────────────────────────────────────
  useEffect(() => {
    let lastSpawn = 0;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top  = `${e.clientY}px`;
      }
      if (ringWrapRef.current) {
        ringWrapRef.current.style.transform = `translate(${dx * 0.018}px, ${dy * 0.018}px)`;
      }

      const now = performance.now();
      if (now - lastSpawn < 33) return;
      lastSpawn = now;
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          vx: (Math.random() - 0.5) * 1.8,
          vy: -(Math.random() * 1.5 + 0.5),
          life: 35 + Math.random() * 25,
          maxLife: 60,
          size: 0.8 + Math.random() * 1.8,
        });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0d3d2e 0%, #022c22 60%, #011a15 100%)',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.7s ease-out',
      }}
    >
      {/* Sparkle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(217,119,6,0.10) 0%, transparent 65%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.5s cubic-bezier(0.22,1,0.36,1), top 0.5s cubic-bezier(0.22,1,0.36,1)',
          left: '50%', top: '50%', zIndex: 1,
        }}
      />

      {/* Main visual — parallax wrapper */}
      <div
        ref={ringWrapRef}
        className="relative flex items-center justify-center"
        style={{ transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)', zIndex: 2 }}
      >
        {/* SVG ring */}
        <svg width="300" height="300" viewBox="0 0 280 280" className="absolute">
          {/* Outer decorative ring */}
          <circle cx={CX} cy={CY} r={R + 18}
            fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

          {/* Background ring */}
          <circle cx={CX} cy={CY} r={R}
            fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.2" />

          {/* Progress arc */}
          <circle ref={arcRef} cx={CX} cy={CY} r={R}
            fill="none" stroke="#D97706" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUM}
            strokeDashoffset={CIRCUM}
            transform={`rotate(-90 ${CX} ${CY})`}
            style={{ filter: 'drop-shadow(0 0 4px rgba(217,119,6,0.5))' }}
          />

          {/* 12 tick marks */}
          {TICKS.map((tk, i) => (
            <line key={i}
              ref={el => { tickRefs.current[i] = el; }}
              x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2}
              stroke="rgba(255,255,255,0.12)" strokeWidth="0.7" strokeLinecap="round"
            />
          ))}

          {/* Corner diamonds at 4 cardinal points */}
          {[0, 90, 180, 270].map((deg, i) => {
            const rad = (deg - 90) * Math.PI / 180;
            const bx = CX + (R + 10) * Math.cos(rad);
            const by = CY + (R + 10) * Math.sin(rad);
            return (
              <rect key={i}
                x={bx - 3} y={by - 3} width="6" height="6"
                fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="0.8"
                transform={`rotate(45 ${bx} ${by})`}
              />
            );
          })}
        </svg>

        {/* Crane logo — center of ring */}
        <div style={{ position: 'relative', width: '168px', height: '168px' }}>
          <div
            ref={logoRef}
            style={{
              width: '168px',
              height: '168px',
              backgroundColor: '#FFE4B1',
              maskImage: 'url(/logo-nqt.svg)',
              maskRepeat: 'no-repeat',
              maskSize: 'contain',
              maskPosition: 'center',
              WebkitMaskImage: 'url(/logo-nqt.svg)',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              WebkitMaskPosition: 'center',
              filter: 'drop-shadow(0 0 18px rgba(255,228,177,0.18))',
              transition: 'transform 0.1s ease-out',
            }}
          />
          <span style={{
            position: 'absolute',
            top: '8px',
            right: '10px',
            fontSize: '17px',
            fontWeight: 'bold',
            lineHeight: 1,
            color: 'rgba(255,228,177,0.65)',
            fontFamily: 'sans-serif',
          }}>®</span>
        </div>
      </div>

      {/* Brand name + progress */}
      <div className="text-center select-none mt-8" style={{ zIndex: 2 }}>
        <h1
          className="text-white font-bold mb-2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            letterSpacing: '0.04em',
          }}
        >
          Nam Quốc Tửu
        </h1>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-amber-600 opacity-50" />
          <span className="text-amber-500 opacity-70"
            style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', letterSpacing: '0.15em', fontSize: 'clamp(0.7rem, 2vw, 0.85rem)' }}>
            Heritage Spirit
          </span>
          <div className="w-8 h-px bg-amber-600 opacity-50" />
        </div>

        {/* Progress counter */}
        <div className="flex items-baseline justify-center gap-1">
          <span
            ref={pctRef}
            className="text-white font-light"
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: '28px',
              fontStyle: 'italic',
              opacity: 0.6,
            }}
          >
            0
          </span>
          <span className="text-white/30 text-xs" style={{ fontFamily: 'sans-serif' }}>%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
