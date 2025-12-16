import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

const Hero: React.FC = () => {
  const { siteContent } = useData();
  const { hero } = siteContent;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-emerald-950">
      
      {/* Background Image with Parallax Feel & Filters */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-float scale-110"
          style={{ backgroundImage: `url("${hero.backgroundImage}")` }} 
        ></div>
        {/* Cinematic Layers */}
        <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-emerald-950/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,83,9,0.2),transparent_70%)]"></div>
      </div>

      {/* Ornate Frame (Indochine Style) */}
      <div className="absolute inset-6 md:inset-10 border border-white/10 pointer-events-none z-20">
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-amber-500/60"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-amber-500/60"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-amber-500/60"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-amber-500/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-[1600px] mx-auto z-30 pt-10">
        
        {/* Top Decorative */}
        <div className="mb-6 opacity-0 animate-fade-in-up flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber-500/50"></div>
            <Star size={12} className="text-amber-500 fill-amber-500 animate-pulse-slow" />
            <div className="h-px w-12 bg-amber-500/50"></div>
          </div>
          <span className="font-script text-5xl md:text-6xl text-amber-200 opacity-90 block transform -rotate-2 mix-blend-screen tracking-wide">
            {hero.topTagline}
          </span>
        </div>
        
        {/* Main Title - Typographic Masterpiece */}
        <div className="relative mb-10 group cursor-default">
           <h1 className="font-display text-7xl md:text-9xl lg:text-[10rem] text-cream-50 font-medium leading-[0.8] tracking-tighter drop-shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block relative z-10 hover:text-white transition-colors duration-700">{hero.mainTitle}</span>
            <span className="block text-4xl md:text-7xl lg:text-8xl font-serif font-light italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cream-100 to-amber-200 mt-4 z-0">
              {hero.subTitle}
            </span>
          </h1>
        </div>
        
        {/* Metadata Badge */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full hover:bg-white/10 transition-colors">
             <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
             <span className="text-amber-100/90 text-[11px] tracking-[0.3em] uppercase font-bold">OCOP 4 Sao</span>
          </div>
          <span className="hidden md:inline-block text-white/20 text-[10px]">•</span>
          <div className="flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full hover:bg-white/10 transition-colors">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
             <span className="text-amber-100/90 text-[11px] tracking-[0.3em] uppercase font-bold">Since 18xx</span>
          </div>
        </div>

        {/* Description */}
        <div className="overflow-hidden mb-12 max-w-xl">
          <p className="text-lg md:text-2xl text-cream-100/80 font-serif italic leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            {hero.description}
          </p>
        </div>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center gap-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          <Link 
            to="/products" 
            className="group relative px-12 py-4 overflow-hidden rounded-full bg-cream-50 transition-all duration-500 hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-3 text-emerald-950 font-sans font-bold tracking-[0.2em] text-xs uppercase">
              {hero.buttonText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300"/>
            </span>
            <div className="absolute inset-0 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
          </Link>
          
          <Link 
            to="/story" 
            className="group flex items-center gap-2 text-cream-100/70 hover:text-white transition-colors px-4 py-2"
          >
             <span className="text-xs font-bold uppercase tracking-[0.2em] border-b border-transparent group-hover:border-white transition-all pb-1">Câu Chuyện</span>
          </Link>

          {/* Temporary Admin Button */}
          <Link 
            to="/admin/login" 
            className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-emerald-900/40 backdrop-blur-md text-emerald-100/60 hover:text-amber-300 hover:bg-emerald-950 hover:border-amber-500/50 text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg"
          >
             <ShieldCheck size={12} />
             Admin Access
          </Link>
        </div>
      </div>
      
      {/* Absolute Vertical Text */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block z-30 opacity-0 animate-fade-in-up mix-blend-overlay" style={{ animationDelay: '1.2s' }}>
         <span className="text-vertical font-sans text-xs font-bold tracking-[0.5em] text-white/50 uppercase">
            Bắc Kạn • Viet Nam
         </span>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
         <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-amber-500 to-transparent"></div>
         <span className="text-[9px] uppercase tracking-[0.3em] text-amber-500/70">Khám phá</span>
      </div>
    </div>
  );
};

export default Hero;