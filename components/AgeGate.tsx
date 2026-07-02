
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

type Phase = 'idle' | 'fade-out' | 'curtain';

const AgeGate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const { siteContent } = useData();
  const { ageGate } = siteContent;

  useEffect(() => {
    const isVerified = sessionStorage.getItem('ageVerified');
    if (!isVerified) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.setItem('ageVerified', 'true');
    // Phase 1: fade content out
    setPhase('fade-out');
    // Phase 2: curtains slide apart
    setTimeout(() => setPhase('curtain'), 220);
    // Phase 3: unmount after curtains fully open
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 1300);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  const curtainOpen = phase === 'curtain';
  const contentGone = phase !== 'idle';

  // Shared background layers duplicated across both curtain halves
  const BgLayers = () => (
    <>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950/60" />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')" }}
      />
    </>
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center overflow-hidden">

      {/* ── Left curtain ── */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-emerald-950"
        style={{
          transform: curtainOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: curtainOpen
            ? 'transform 0.95s cubic-bezier(0.77,0,0.175,1) 0.08s'
            : 'none',
        }}
      >
        <BgLayers />
        {/* seam shadow on right edge */}
        <div className="absolute right-0 inset-y-0 w-10 bg-gradient-to-r from-transparent to-black/25 pointer-events-none" />
      </div>

      {/* ── Right curtain ── */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-emerald-950"
        style={{
          transform: curtainOpen ? 'translateX(100%)' : 'translateX(0)',
          transition: curtainOpen
            ? 'transform 0.95s cubic-bezier(0.77,0,0.175,1) 0.08s'
            : 'none',
        }}
      >
        <BgLayers />
        {/* seam shadow on left edge */}
        <div className="absolute left-0 inset-y-0 w-10 bg-gradient-to-l from-transparent to-black/25 pointer-events-none" />
      </div>

      {/* ── Golden center line — flashes as curtains part ── */}
      <div
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(245,158,11,0.7) 30%, rgba(245,158,11,0.7) 70%, transparent 100%)',
          opacity: curtainOpen ? 1 : 0,
          transition: curtainOpen ? 'opacity 0.15s ease' : 'none',
        }}
      />

      {/* ── Card content ── */}
      <div
        className="relative z-10 p-8 max-w-lg w-full text-center mx-4"
        style={{
          opacity: contentGone ? 0 : 1,
          transform: contentGone ? 'scale(0.95) translateY(10px)' : 'scale(1) translateY(0)',
          transition: 'opacity 0.22s ease, transform 0.22s ease',
          pointerEvents: contentGone ? 'none' : 'auto',
        }}
      >
        {/* Border Frame */}
        <div className="absolute inset-0 border border-amber-500/20 rounded-2xl pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-amber-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-amber-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-amber-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500" />
        </div>

        <div className="py-8">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{ageGate.heading}</h2>
          <p className="text-emerald-100/70 text-lg font-light mb-8">
            {ageGate.subHeading}
          </p>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleConfirm}
              className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold uppercase tracking-widest text-sm rounded transition-all shadow-lg hover:shadow-amber-500/20"
            >
              {ageGate.confirmBtn}
            </button>
            <button
              onClick={handleReject}
              className="w-full py-4 bg-transparent border border-emerald-800 text-emerald-400 hover:text-white hover:border-white font-bold uppercase tracking-widest text-sm rounded transition-all"
            >
              {ageGate.rejectBtn}
            </button>
          </div>

          <p className="mt-8 text-[10px] text-emerald-100/30 uppercase tracking-widest">
            {ageGate.warning}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgeGate;
