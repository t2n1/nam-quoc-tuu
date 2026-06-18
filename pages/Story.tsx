
import React, { useEffect, useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Quote, MoveDown, Droplets, Sparkles, Plane, Award, Globe, Star, ArrowRight, Map as MapIcon, Compass, Mountain, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const Story: React.FC = () => {
  const { siteContent } = useData();
  const { story } = siteContent;

  return (
    <div className="bg-emerald-950 min-h-screen relative overflow-hidden text-amber-50">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none z-0"></div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10">
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,83,9,0.2),transparent_70%)]"></div>
            <img src={story.header.image} alt="Story Hero" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
         </div>
         <div className="relative z-10 text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-px w-12 bg-amber-500/30"></div>
               <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.4em]">{story.header.tagline}</span>
               <div className="h-px w-12 bg-amber-500/30"></div>
            </div>
            {/* FIXED LEADING */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] leading-[1.1] text-white tracking-tighter mb-8 drop-shadow-2xl">
               {story.header.title} <br/><span className="text-amber-500 italic font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl">{story.header.subtitle}</span>
            </h1>
            <p className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-emerald-100/80 max-w-3xl mx-auto italic font-light leading-relaxed">
               {story.header.quote}
            </p>
         </div>
         <div className="absolute bottom-12 animate-bounce">
            <MoveDown size={28} className="text-amber-500/40" />
         </div>
      </section>

      {/* 3. CHAPTER I: The Origin */}
      <section className="py-20 md:py-32 lg:py-40 relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="relative order-2 md:order-1 group">
               <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl border border-white/5">
                  <img src={story.chapter1.image} alt="Origin" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[2s]" />
                  <div className="absolute bottom-10 -right-4 z-20 bg-amber-600 px-6 py-3 shadow-2xl border border-white/10">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white">{story.chapter1.imageCaption}</span>
                  </div>
               </div>
               <div className="absolute -top-20 -left-20 font-display text-[15rem] text-white/5 select-none leading-none">01</div>
            </div>
            <div className="order-1 md:order-2">
               <div className="flex items-center gap-4 mb-8">
                  <div className="h-px w-10 bg-amber-500"></div>
                  <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs">{story.chapter1.label}</span>
               </div>
               {/* FIXED LEADING */}
               <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-10 leading-[1.15]">{story.chapter1.title}</h2>
               
               {/* CHANGED: Added tracking-wide for luxury feel */}
               <div className="prose prose-xl prose-invert font-sans font-light tracking-wide text-emerald-100/80 leading-relaxed text-justify">
                  <p className="first-letter:text-6xl md:first-letter:text-8xl first-letter:float-left first-letter:mr-4 md:first-letter:mr-6 first-letter:text-amber-500 first-letter:font-display first-letter:leading-none text-lg md:text-xl">
                     {story.chapter1.dropCapText}{story.chapter1.content}
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* 4. CHAPTER II: THE KEEPER */}
      <section className="py-20 md:py-32 lg:py-40 relative z-10">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
            <div className="pr-0 md:pr-12 text-left md:text-right">
               <div className="flex items-center gap-4 mb-8 justify-start md:justify-end">
                  <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-xs">Chương II</span>
                  <div className="h-px w-10 bg-amber-500"></div>
               </div>
               {/* FIXED LEADING */}
               <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white mb-10 leading-[1.15]">{story.section2.title}</h2>
               
               {/* CHANGED: Added tracking-wide */}
               <p className="font-sans font-light tracking-wide text-lg md:text-xl text-emerald-100/80 leading-relaxed mb-12 text-justify">
                  {story.section2.content}
               </p>
               <div className="flex items-center gap-6 justify-start md:justify-end pt-8 border-t border-white/5">
                  <div className="text-left md:text-right">
                     <div className="font-bold text-amber-50 text-base uppercase tracking-widest border-b border-amber-500 pb-1 inline-block mb-1">{story.signature.name}</div>
                     <div className="text-[10px] text-emerald-500 uppercase tracking-widest">{story.signature.role}</div>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-emerald-900 flex items-center justify-center border border-amber-500/20 font-script text-3xl text-amber-500 shadow-xl">Tam</div>
               </div>
            </div>
            <div className="relative">
               <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] shadow-2xl border border-white/5 group">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=988&auto=format&fit=crop" alt="The Keeper" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-80"></div>
               </div>
               <div className="absolute -bottom-10 -right-10 font-display text-[15rem] text-white/5 select-none leading-none">02</div>
            </div>
         </div>
      </section>

      {/* 5. EPILOGUE */}
      <section className="py-20 md:py-32 lg:py-48 bg-emerald-950 text-white border-t border-white/5 relative">
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            {/* FIXED LEADING */}
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-10 md:mb-16 leading-[1.15]">{story.section3.title}</h2>
            
            {/* CHANGED: Added tracking-wide */}
            <p className="text-lg md:text-xl lg:text-2xl font-sans font-light tracking-wide text-emerald-100/70 leading-relaxed mb-12 md:mb-20 max-w-3xl mx-auto">
               {story.section3.content}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-16 border-t border-white/10">
               <div className="text-center group">
                  <div className="font-display text-5xl md:text-6xl text-amber-500 group-hover:scale-110 transition-transform mb-4">32</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold">Thảo mộc rừng</div>
               </div>
               <div className="text-center sm:border-x border-white/10 group">
                  <div className="font-display text-5xl md:text-6xl text-amber-500 group-hover:scale-110 transition-transform mb-4">4★</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold">Chuẩn OCOP</div>
               </div>
               <div className="text-center group">
                  <div className="font-display text-5xl md:text-6xl text-amber-500 group-hover:scale-110 transition-transform mb-4">100%</div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-emerald-500 font-bold">Tự nhiên</div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Story;
