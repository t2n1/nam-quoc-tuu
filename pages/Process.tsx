
import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Leaf, Sprout, Hourglass, FlaskConical, PackageCheck, MoveDown, Sparkles } from 'lucide-react';

const Process: React.FC = () => {
  const { processSteps, siteContent } = useData();
  const { processPage } = siteContent;
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (iconName: string, isActive: boolean) => {
    const size = 28;
    const className = `transition-all duration-700 ${isActive ? 'text-amber-400 scale-110' : 'text-emerald-300'}`;
    switch (iconName) {
      case 'Leaf': return <Leaf size={size} className={className} />;
      case 'Sprout': return <Sprout size={size} className={className} />;
      case 'Hourglass': return <Hourglass size={size} className={className} />;
      case 'FlaskConical': return <FlaskConical size={size} className={className} />;
      case 'PackageCheck': return <PackageCheck size={size} className={className} />;
      default: return <Leaf size={size} className={className} />;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      setScrollProgress(Math.min(scrollTop / docHeight, 1));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.getAttribute('data-index')));
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );

    stepRefs.current.forEach((el) => { if (el) observer.observe(el); });
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-emerald-950 min-h-screen text-amber-50 relative overflow-hidden">
      
      {/* Texture Overlay */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none z-0"></div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10">
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-0"></div>
         <div className="relative z-10 text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-px w-12 bg-amber-500/30"></div>
               <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.4em]">{processPage.header.tagline}</span>
               <div className="h-px w-12 bg-amber-500/30"></div>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] mb-6 md:mb-8 leading-none drop-shadow-2xl">{processPage.header.title}</h1>
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-emerald-100/60 max-w-2xl mx-auto italic font-light px-4">{processPage.header.subtitle}</p>
         </div>
         <div className="absolute bottom-12 animate-bounce text-amber-500/50"><MoveDown size={32} /></div>
      </section>

      {/* --- THE GOLDEN THREAD (Continuous Journey) --- */}
      <div className="absolute top-[80vh] left-6 md:left-1/2 -translate-x-1/2 w-[1px] md:w-[2px] h-[calc(100%-120vh)] bg-emerald-900/50 z-0 origin-top">
         <div 
            className="w-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all duration-100 ease-linear rounded-full" 
            style={{ height: `${(scrollProgress * 100)}%` }}
         ></div>
      </div>

      {/* 2. STEPS JOURNEY */}
      <section className="relative pb-20 pt-16 md:pb-32 md:pt-20 lg:pb-40 max-w-[1400px] mx-auto px-6 z-10">
         {processSteps.map((step, index) => {
            const isActive = activeStep === index;
            return (
               <div 
                  key={step.step}
                  data-index={index}
                  ref={el => (stepRefs.current[index] = el)}
                  className={`relative flex flex-col md:flex-row items-center justify-between mb-24 md:mb-32 lg:mb-48 last:mb-20 gap-8 md:gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
               >
                  {/* Step Marker Jewel */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
                     <div className={`flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full border-2 transition-all duration-700 bg-emerald-950 ${isActive ? 'border-amber-500 scale-110 shadow-[0_0_30px_rgba(245,158,11,0.3)]' : 'border-emerald-800 scale-100'}`}>
                        {getIcon(step.icon, isActive)}
                     </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[42%] text-left ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-16 md:pl-0`}>
                     <span className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold transition-all duration-700 ${isActive ? 'text-amber-500/20' : 'text-emerald-900'}`}>0{step.step}</span>
                     <h3 className={`font-display text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 transition-colors duration-700 ${isActive ? 'text-amber-100' : 'text-emerald-700'}`}>{step.title}</h3>
                     <ul className={`space-y-4 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                        {step.description.map((desc, i) => (
                           <li key={i} className={`text-emerald-100/60 font-light text-lg leading-relaxed flex items-center gap-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-700 ${isActive ? 'bg-amber-500' : 'bg-emerald-800'}`}></span> 
                              {desc}
                           </li>
                        ))}
                     </ul>
                  </div>

                  {/* Visual Side */}
                  <div className="w-full md:w-[42%] pl-16 md:pl-0">
                     <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-[1.5s] ${isActive ? 'scale-100 opacity-100 border-amber-500/20' : 'scale-90 opacity-30 grayscale border-transparent'} border`}>
                        {step.image ? (
                          <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-emerald-900/50 flex items-center justify-center italic text-emerald-800">Visualizing the craft...</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent"></div>
                     </div>
                  </div>
               </div>
            );
         })}
      </section>

      {/* 3. PHILOSOPHY QUOTE (Redesigned - Clean & Elegant) */}
      <section className="relative py-24 md:py-32 lg:py-48 bg-[#022c22] overflow-hidden border-t border-white/5 flex items-center justify-center">
         {/* Ambient Background */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-amber-600/5 rounded-full blur-[100px]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30"></div>
         </div>

         <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
             
             {/* Center Ornament instead of Quotes */}
             <div className="mb-16 flex justify-center animate-fade-in-up">
                <div className="relative group">
                    <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <Hourglass className="relative text-amber-500/80" size={48} strokeWidth={0.8} />
                </div>
             </div>
             
             <div className="relative animate-reveal">
                <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-emerald-50 leading-tight tracking-tight relative z-10 drop-shadow-2xl">
                   {processPage.bottomQuote}
                </h2>
                
                {/* Elegant Underline */}
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent mx-auto mt-12 mb-10"></div>
             </div>

             <div className="flex items-center justify-center gap-4 opacity-70 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500">Triết lý Nam Quốc Tửu</span>
             </div>
         </div>
      </section>
    </div>
  );
};

export default Process;
