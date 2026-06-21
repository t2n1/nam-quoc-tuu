import React, { useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Leaf, Sprout, Hourglass, FlaskConical, PackageCheck } from 'lucide-react';
import Reveal from '../components/Reveal';

const Process: React.FC = () => {
  const { processSteps, siteContent } = useData();
  const { processPage, story } = siteContent;
  const heroImgRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroImgRef.current) return;
      heroImgRef.current.style.transform = `scale(1.1) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      if (!timelineRef.current || !progressLineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight / 2 - rect.top;
      const progress = Math.min(Math.max(scrolled / rect.height, 0), 1);
      progressLineRef.current.style.transform = `scaleY(${progress})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf': return <Leaf size={22} />;
      case 'Sprout': return <Sprout size={22} />;
      case 'Hourglass': return <Hourglass size={22} />;
      case 'FlaskConical': return <FlaskConical size={22} />;
      case 'PackageCheck': return <PackageCheck size={22} />;
      default: return <Leaf size={22} />;
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="h-screen relative overflow-hidden flex items-end pb-28">
        <div ref={heroImgRef} className="absolute inset-0 scale-110 will-change-transform">
          <img
            src={story.header.image}
            alt="Quy Trình Tạo Tác"
            className="w-full h-full object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-emerald-950/30 to-emerald-950" />
        </div>

        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-white/15" />
          <span className="text-white/30 text-[9px] tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl' }}>
            Craftsmanship
          </span>
          <div className="w-px h-20 bg-white/15" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 lg:px-12 w-full">
          <p
            className="font-script text-amber-400 text-5xl md:text-7xl block animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {processPage.header.tagline}
          </p>
          <h1
            className="font-display text-white font-bold leading-none tracking-tighter animate-fade-in-up"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', animationDelay: '0.55s', animationFillMode: 'both' }}
          >
            {processPage.header.title}
          </h1>
          <div
            className="flex items-center gap-6 mt-8 animate-fade-in-up"
            style={{ animationDelay: '0.85s', animationFillMode: 'both' }}
          >
            <div className="h-px w-16 bg-amber-400/40" />
            <span className="text-white/50 font-serif italic text-sm tracking-widest">
              Nam Quốc Tửu  •  Bằng Phúc, Bắc Kạn
            </span>
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-fade-in-up"
          style={{ animationDelay: '1.3s', animationFillMode: 'both' }}
        >
          <span className="text-white/25 text-[8px] tracking-[0.4em] uppercase mb-2">Cuộn xuống</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/10 to-amber-400/50" />
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <div className="bg-cream-100 py-28">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="relative" ref={timelineRef}>
            {/* Base line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-900/10 hidden md:block" />
            {/* Animated progress line */}
            <div
              ref={progressLineRef}
              className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block origin-top"
              style={{
                transform: 'scaleY(0)',
                background: 'linear-gradient(to bottom, rgba(245,158,11,0.8), rgba(245,158,11,0.3))',
                boxShadow: '0 0 8px 1px rgba(245,158,11,0.4)',
              }}
            />

            <div className="space-y-16 md:space-y-0">
              {processSteps.map((step, index) => (
                <Reveal key={step.step} variant={index % 2 === 0 ? 'fade-right' : 'fade-left'} delay={80}>
                  <div className={`md:flex items-center justify-between relative md:py-14 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    {/* Center dot */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cream-100 border-2 border-amber-500 rounded-full z-10 hidden md:block">
                      <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-20" />
                    </div>

                    {/* Text side */}
                    <div className={`w-full md:w-[44%] ${index % 2 === 0 ? 'md:text-right md:pr-14' : 'md:text-left md:pl-14'}`}>
                      <div className={`flex items-baseline gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="font-display text-5xl text-emerald-900/15 font-bold leading-none select-none">0{step.step}</span>
                        <h3 className="font-serif text-xl text-emerald-950 font-semibold">{step.title}</h3>
                      </div>
                      <ul className={`space-y-2 ${index % 2 === 0 ? 'md:ml-auto' : ''}`} style={{ maxWidth: '340px', marginLeft: index % 2 === 0 ? 'auto' : undefined }}>
                        {step.description.map((desc, i) => (
                          <li key={i} className="text-stone-500 text-sm leading-relaxed font-light">
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image / icon side */}
                    <div className={`w-full md:w-[44%] mt-6 md:mt-0 ${index % 2 === 0 ? 'md:pl-14' : 'md:pr-14'}`}>
                      <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-900/5 rotate-2 rounded-xl transition-transform group-hover:rotate-3" />
                        <div className="bg-cream-50 rounded-xl border border-cream-300/40 relative z-10 overflow-hidden flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-500" style={{ aspectRatio: '16/9' }}>
                          {step.image ? (
                            <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="p-5 bg-emerald-950/[0.08] rounded-full text-emerald-900 group-hover:bg-emerald-950 group-hover:text-amber-400 transition-colors duration-500">
                              {getIcon(step.icon)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CLOSING QUOTE — dark ──────────────────────────────── */}
      <section className="bg-emerald-950 py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

        <div className="max-w-3xl mx-auto px-5 md:px-8 lg:px-12 text-center relative z-10">
          <Reveal variant="blur-in">
            <div className="font-serif text-amber-500/10 leading-none select-none" style={{ fontSize: '8rem' }}>"</div>
          </Reveal>
          <Reveal variant="blur-in" delay={150}>
            <p className="font-serif italic text-white text-2xl md:text-3xl leading-[1.8] -mt-8">
              {processPage.bottomQuote}
            </p>
          </Reveal>
          <Reveal variant="fade-up" delay={350}>
            <div className="flex justify-center items-center gap-3 mt-10">
              <div className="w-8 h-px bg-amber-500/20" />
              <div className="w-1.5 h-1.5 bg-amber-500/35 rotate-45" />
              <div className="w-2 h-2 bg-amber-500/45 rotate-45" />
              <div className="w-1.5 h-1.5 bg-amber-500/35 rotate-45" />
              <div className="w-8 h-px bg-amber-500/20" />
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
};

export default Process;
