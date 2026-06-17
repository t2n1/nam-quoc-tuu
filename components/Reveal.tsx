import React, { useRef, useEffect, useState, ReactNode, CSSProperties } from 'react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'clip-up'
  | 'fade-in'
  | 'zoom-rotate'
  | 'blur-in';

const VARIANTS: Record<RevealVariant, { from: CSSProperties; to: CSSProperties }> = {
  'fade-up':     { from: { opacity: 0, transform: 'translateY(52px)' },            to: { opacity: 1, transform: 'translateY(0)' } },
  'fade-down':   { from: { opacity: 0, transform: 'translateY(-32px)' },           to: { opacity: 1, transform: 'translateY(0)' } },
  'fade-left':   { from: { opacity: 0, transform: 'translateX(-60px)' },           to: { opacity: 1, transform: 'translateX(0)' } },
  'fade-right':  { from: { opacity: 0, transform: 'translateX(60px)' },            to: { opacity: 1, transform: 'translateX(0)' } },
  'scale-up':    { from: { opacity: 0, transform: 'scale(0.82)' },                 to: { opacity: 1, transform: 'scale(1)' } },
  'clip-up':     { from: { opacity: 0, clipPath: 'inset(100% 0 0 0)', transform: 'translateY(16px)' }, to: { opacity: 1, clipPath: 'inset(0% 0 0 0)', transform: 'translateY(0)' } },
  'fade-in':     { from: { opacity: 0 },                                           to: { opacity: 1 } },
  'zoom-rotate': { from: { opacity: 0, transform: 'scale(0.72) rotate(-8deg)' },   to: { opacity: 1, transform: 'scale(1) rotate(0deg)' } },
  'blur-in':     { from: { opacity: 0, filter: 'blur(12px)', transform: 'translateY(24px)' }, to: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' } },
};

const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

function buildTransition(variant: string, duration: number, delay: number) {
  const base = `opacity ${duration}ms ${EASING} ${delay}ms, transform ${duration}ms ${EASING} ${delay}ms`;
  if (variant === 'clip-up') return base + `, clip-path ${duration}ms ${EASING} ${delay}ms`;
  if (variant === 'blur-in') return base + `, filter ${duration}ms ${EASING} ${delay}ms`;
  return base;
}

const Reveal: React.FC<{
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 1300,
  threshold = 0.1,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const v = VARIANTS[variant];

  return (
    <div
      ref={ref}
      style={{
        ...(visible ? v.to : v.from),
        transition: buildTransition(variant, duration, delay),
        willChange: 'opacity, transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default Reveal;
