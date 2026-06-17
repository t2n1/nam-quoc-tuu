


import React, { useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Leaf, Sprout, Hourglass, FlaskConical, PackageCheck } from 'lucide-react';

const Process: React.FC = () => {
  const { processSteps, siteContent } = useData();
  const { processPage } = siteContent;
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

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
      case 'Leaf': return <Leaf size={24} />;
      case 'Sprout': return <Sprout size={24} />;
      case 'Hourglass': return <Hourglass size={24} />;
      case 'FlaskConical': return <FlaskConical size={24} />;
      case 'PackageCheck': return <PackageCheck size={24} />;
      default: return <Leaf size={24} />;
    }
  };

  return (
    <div className="py-32 bg-cream-100 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center mb-32 animate-fade-in-up">
          <span className="font-script text-6xl text-amber-600/30 block mb-4">{processPage.header.tagline}</span>
          <h1 className="font-display text-6xl md:text-7xl text-emerald-950 mb-6">{processPage.header.title}</h1>
          <p className="max-w-xl mx-auto text-stone-600 font-light italic animate-fade-in-up" style={{ animationDelay: '0.2s' }}>{processPage.header.subtitle}</p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Central Line - dim base */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-emerald-900/10 hidden md:block"></div>
          {/* Progress line - lights up on scroll */}
          <div
            ref={progressLineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-500 hidden md:block origin-top"
            style={{ transform: 'scaleY(0)', boxShadow: '0 0 8px 1px rgba(245,158,11,0.5)' }}
          ></div>

          <div className="space-y-24 md:space-y-0">
            {processSteps.map((step, index) => (
              <div key={step.step} className={`md:flex items-center justify-between relative animate-fade-in-up ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`} style={{ animationDelay: `${index * 0.15 + 0.3}s` }}>
                 
                 {/* Center Dot */}
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cream-100 border-2 border-amber-500 rounded-full z-10 hidden md:block">
                   <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-20"></div>
                 </div>

                 {/* Content Side */}
                 <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className={`mb-4 flex items-center gap-4 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                       <span className="font-display text-6xl text-emerald-900/20 font-bold">0{step.step}</span>
                       <h3 className="font-serif text-3xl text-emerald-950">{step.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {step.description.map((desc, i) => (
                        <li key={i} className="text-stone-600 font-light text-lg leading-relaxed">
                          {desc}
                        </li>
                      ))}
                    </ul>
                 </div>

                 {/* Image/Icon Side */}
                 <div className={`w-full md:w-[45%] mt-8 md:mt-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="relative group">
                       <div className="absolute inset-0 bg-emerald-900/5 transform rotate-3 rounded-2xl transition-transform group-hover:rotate-6"></div>
                       <div className="bg-white p-4 md:p-10 rounded-2xl border border-stone-200 shadow-xl relative z-10 flex items-center justify-center aspect-video group-hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                          {step.image ? (
                             <img 
                               src={step.image} 
                               alt={step.title} 
                               className="w-full h-full object-cover rounded-lg"
                             />
                          ) : (
                             <div className="p-6 bg-emerald-50 rounded-full text-emerald-900 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-500">
                                {getIcon(step.icon)}
                             </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-40 mb-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="relative inline-block px-8">
            <span className="absolute -top-10 left-0 font-serif text-[8rem] leading-none text-amber-500/15 select-none">"</span>
            <p className="font-serif italic text-emerald-950 text-4xl md:text-5xl leading-snug relative z-10">
              {processPage.bottomQuote}
            </p>
            <span className="absolute -bottom-14 right-0 font-serif text-[8rem] leading-none text-amber-500/15 select-none rotate-180">"</span>
            <div className="w-16 h-1 bg-amber-500 mx-auto mt-10 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Process;
