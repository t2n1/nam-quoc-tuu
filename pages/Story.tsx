import React, { useRef, useEffect, useState } from 'react';
import { useData } from '../context/DataContext';
import Reveal from '../components/Reveal';

const HERBS = [
  'Tầm Bóp', 'Ích Mẫu', 'Ngải Cứu', 'Hương Nhu', 'Quế Chi', 'Hồi Hương',
  'Gừng Rừng', 'Sả Núi', 'Đinh Hương', 'Thảo Quả', 'Lá Lốt', 'Trầu Rừng',
  'Bách Bộ', 'Kim Ngân', 'Trinh Nữ', 'Câu Kỷ Tử',
];

function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

const Story: React.FC = () => {
  const { siteContent } = useData();
  const { story } = siteContent;
  const { count: herbCount, ref: counterRef } = useCounter(32);
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroImgRef.current) return;
      heroImgRef.current.style.transform = `scale(1.1) translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-cream-100 min-h-screen overflow-x-hidden">

      {/* ── HERO — full-screen parallax ────────────────────── */}
      <section className="h-screen relative overflow-hidden flex items-end pb-28">
        <div ref={heroImgRef} className="absolute inset-0 scale-110 will-change-transform">
          <img
            src={story.header.image}
            alt="Bắc Kạn"
            className="w-full h-full object-cover brightness-[0.55]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-emerald-950/30 to-emerald-950" />
        </div>

        {/* Vertical label */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-white/15" />
          <span className="text-white/30 text-[9px] tracking-[0.5em] uppercase text-vertical">Di Sản</span>
          <div className="w-px h-20 bg-white/15" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 lg:px-12 w-full">
          <p
            className="font-script text-amber-400 text-5xl md:text-7xl block animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {story.header.subtitle}
          </p>
          <h1
            className="font-serif text-white font-bold leading-none tracking-tighter animate-fade-in-up"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', animationDelay: '0.55s', animationFillMode: 'both' }}
          >
            {story.header.title}
          </h1>
          <div
            className="flex items-center gap-6 mt-8 animate-fade-in-up"
            style={{ animationDelay: '0.85s', animationFillMode: 'both' }}
          >
            <div className="h-px w-16 bg-amber-400/40" />
            <span className="text-white/45 font-serif italic text-sm tracking-widest">Bắc Kạn  •  Từ thế kỷ XVIII</span>
            <div className="h-px w-20 bg-white/8" />
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-fade-in-up"
          style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
        >
          <span className="text-white/25 text-[8px] tracking-[0.4em] uppercase mb-2">Cuộn xuống</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/10 to-amber-400/50" />
        </div>
      </section>

      {/* ── CHAPTER I — dark, immersive ────────────────────── */}
      <section className="bg-emerald-950 py-32 relative overflow-hidden">
        {/* Watermark chapter number */}
        <div className="pointer-events-none select-none absolute -right-8 top-0 bottom-0 flex items-center overflow-hidden">
          <span className="font-serif font-bold text-white/[0.025] leading-none" style={{ fontSize: '26rem' }}>I</span>
        </div>

        {/* Top border accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">

          <Reveal variant="blur-in">
            <div className="mb-16">
              <span className="text-amber-500/45 text-[10px] tracking-[0.7em] uppercase block mb-5">
                {story.chapter1.label}
              </span>
              <h2 className="font-serif text-5xl md:text-7xl text-white leading-tight">
                {story.chapter1.title}
              </h2>
              <div className="flex items-center gap-3 mt-8">
                <div className="w-16 h-px bg-amber-500/50" />
                <div className="w-2 h-2 bg-amber-500/50 rotate-45 shrink-0" />
                <div className="w-8 h-px bg-amber-500/15" />
              </div>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={150}>
            <blockquote className="font-serif italic text-2xl md:text-[1.7rem] text-amber-200/60 leading-relaxed border-l border-amber-500/20 pl-8 mb-24 max-w-3xl">
              {story.chapter1.quote}
            </blockquote>
          </Reveal>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
            <Reveal variant="fade-right">
              <p className="font-serif text-emerald-100/60 leading-[2.1] text-lg text-justify">
                <span className="float-left font-serif font-bold text-amber-500/20 leading-[0.72] mr-4 mt-2" style={{ fontSize: '6.5rem' }}>
                  {story.chapter1.dropCapText}
                </span>
                {story.chapter1.content}
              </p>
            </Reveal>

            <Reveal variant="fade-left" delay={200}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full border border-amber-500/8 rounded pointer-events-none" />
                <div className="overflow-hidden rounded">
                  <img
                    src={story.chapter1.image}
                    alt={story.chapter1.imageCaption}
                    className="w-full object-cover grayscale brightness-70 hover:scale-105 hover:brightness-90 transition-all duration-[5s] ease-out"
                    style={{ aspectRatio: '3/4' }}
                  />
                </div>
                <div className="bg-emerald-900/60 backdrop-blur-sm px-5 py-3 border-t border-amber-500/10">
                  <p className="text-amber-400/45 text-[9px] uppercase tracking-[0.4em]">
                    {story.chapter1.imageCaption}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HERB MARQUEE ─────────────────────────────────────── */}
      <div className="bg-amber-700 overflow-hidden border-y border-amber-600/40 py-3">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...HERBS, ...HERBS].map((h, i) => (
            <span key={i} className="text-amber-100/65 font-serif italic text-sm mx-8 shrink-0">
              {h}<span className="text-amber-400/35 mx-5">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SECTION 2 — cream, animated counter ──────────────── */}
      <section className="bg-cream-50 py-32 relative overflow-hidden">
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />

        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-20 items-start">

            <Reveal variant="fade-right">
              <div ref={counterRef}>
                <div
                  className="font-serif font-bold leading-none select-none"
                  style={{ fontSize: '10rem', color: 'rgba(2,44,34,0.055)' }}
                >
                  {herbCount}
                </div>
                <h2 className="font-serif text-4xl md:text-5xl text-emerald-950 leading-tight -mt-8">
                  {story.section2.title}
                </h2>
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-12 h-1 bg-amber-600 rounded-full" />
                  <div className="w-4 h-px bg-amber-300/60" />
                </div>
              </div>
            </Reveal>

            <Reveal variant="fade-left" delay={200}>
              <p className="font-serif text-stone-600 leading-[2.1] text-lg text-justify mt-8 md:mt-20">
                {story.section2.content}
              </p>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── HIGHLIGHT QUOTE — cinematic dark ─────────────────── */}
      <section className="min-h-[80vh] bg-emerald-950 flex items-center py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10" />
        {/* Ambient glow */}
        <div className="absolute bottom-0 right-0 w-[700px] h-[400px] bg-amber-900/12 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-emerald-900/15 blur-[120px] rounded-full pointer-events-none" />
        {/* Top/bottom accent lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 text-center relative z-10">
          <Reveal variant="blur-in">
            <div className="font-serif text-amber-500/12 leading-none select-none mb-0" style={{ fontSize: '10rem' }}>"</div>
          </Reveal>

          <Reveal variant="blur-in" delay={150}>
            <p className="font-serif italic text-white text-2xl md:text-[1.95rem] leading-[1.8] -mt-10">
              {story.highlight.content}
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={400}>
            <div className="mt-14">
              <p className="font-serif italic text-amber-400/60 text-lg">— {story.highlight.title}</p>
              <div className="flex justify-center items-center gap-3 mt-8">
                <div className="w-8 h-px bg-amber-500/20" />
                <div className="w-1.5 h-1.5 bg-amber-500/25 rotate-45" />
                <div className="w-2 h-2 bg-amber-500/35 rotate-45" />
                <div className="w-1.5 h-1.5 bg-amber-500/25 rotate-45" />
                <div className="w-8 h-px bg-amber-500/20" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3 — split screen ─────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="md:grid md:grid-cols-2">
          <div className="bg-emerald-950 py-28 px-5 md:px-8 lg:px-16 flex flex-col justify-center min-h-[55vh] relative overflow-hidden">
            <div className="pointer-events-none select-none absolute -right-6 bottom-0 top-0 flex items-end pb-8 overflow-hidden opacity-[0.03]">
              <span className="font-serif font-bold text-white leading-none" style={{ fontSize: '20rem' }}>V</span>
            </div>
            <Reveal variant="fade-right">
              <span className="text-amber-500/40 text-[9px] tracking-[0.6em] uppercase block mb-6">Chương Cuối</span>
              <h2 className="font-serif text-4xl md:text-[3rem] text-white leading-tight">
                {story.section3.title}
              </h2>
              <div className="flex items-center gap-3 mt-10">
                <div className="w-12 h-px bg-amber-500/40" />
                <div className="w-1.5 h-1.5 bg-amber-500/40 rotate-45 shrink-0" />
              </div>
            </Reveal>
          </div>

          <div className="bg-cream-100 py-28 px-5 md:px-8 lg:px-16 flex flex-col justify-center min-h-[55vh] border-l border-cream-300/30">
            <Reveal variant="fade-left" delay={150}>
              <p className="font-serif text-stone-600 leading-[2.1] text-lg text-justify">
                {story.section3.content}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SIGNATURE ────────────────────────────────────────── */}
      <section className="bg-cream-100 py-32">
        <Reveal variant="fade-in" delay={100}>
          <div className="text-center">
            <div className="font-script text-5xl text-emerald-900 opacity-30 mb-8 select-none">Nam Quốc Tửu</div>
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-12 h-px bg-emerald-900/15" />
              <div className="w-1.5 h-1.5 bg-amber-600/45 rotate-45" />
              <div className="w-12 h-px bg-emerald-900/15" />
            </div>
            <p className="text-xs uppercase tracking-[0.45em] text-emerald-900 font-bold mb-2">
              {story.signature.name}
            </p>
            <p className="text-xs text-stone-400 tracking-[0.2em] font-light">
              {story.signature.role}
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Story;
