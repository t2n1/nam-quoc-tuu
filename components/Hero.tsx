
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useData } from '../context/DataContext';
import { EditableText, EditableImage } from './LiveEditor';

const Hero: React.FC = () => {
  const { siteContent } = useData();
  const { hero } = siteContent;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-emerald-950">
      
      {/* Background Image with Parallax Feel & Filters */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 animate-float scale-110"
        >
             <EditableImage 
                path="hero.backgroundImage" 
                src={hero.backgroundImage} 
                alt="Hero Background" 
                className="w-full h-full object-cover"
             />
        </div>
        {/* Cinematic Layers */}
        <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-emerald-950/60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(180,83,9,0.2),transparent_70%)] pointer-events-none"></div>
      </div>

      {/* Ornate Frame (Indochine Style) */}
      <div className="absolute inset-4 md:inset-6 lg:inset-10 border-b border-l border-r border-white/10 pointer-events-none z-20">
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-500/60"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber-500/60"></div>
      </div>

      {/* Main Content - Increased pt to push content down away from header */}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-4 max-w-[1600px] mx-auto z-30 pt-28 pb-12 md:pt-32 md:pb-32 lg:pt-48">
        
        {/* Top Decorative */}
        <div className="mb-6 opacity-0 animate-fade-in-up flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-amber-500/50"></div>
            <Star size={12} className="text-amber-500 fill-amber-500 animate-pulse-slow" />
            <div className="h-px w-12 bg-amber-500/50"></div>
          </div>
          <div className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-200 opacity-90 block transform -rotate-2 mix-blend-screen tracking-wide">
             <EditableText path="hero.topTagline" content={hero.topTagline} />
          </div>
        </div>
        
        {/* Main Title - Typographic Masterpiece */}
        <div className="relative mb-10 group cursor-default">
           <div className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] text-cream-50 font-medium leading-[0.8] tracking-tighter drop-shadow-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="block relative z-10 hover:text-white transition-colors duration-700">
                <EditableText path="hero.mainTitle" content={hero.mainTitle} />
            </div>
            <div className="block text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-serif font-light italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cream-100 to-amber-200 mt-4 z-0">
                <EditableText path="hero.subTitle" content={hero.subTitle} />
            </div>
          </div>
        </div>
        
        {/* Metadata Badge */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full hover:bg-white/10 transition-colors">
             <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
             <span className="text-amber-100/90 text-[11px] tracking-[0.3em] uppercase font-bold">OCOP 4 Sao</span>
          </div>
          <span className="hidden md:inline-block text-white/20 text-[10px]">•</span>
        </div>

        {/* Description */}
        <div className="overflow-hidden mb-12 max-w-xl">
          <div className="text-lg md:text-2xl text-cream-100/80 font-serif italic leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
             <EditableText path="hero.description" content={hero.description} multiline />
          </div>
        </div>

        {/* CTA Button Group - Redesigned (Clean & Balanced) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
          
          {/* Primary Button */}
          <Link 
            to="/products" 
            className="group h-14 pl-8 pr-6 rounded-full bg-[#F5F5F0] hover:bg-white text-emerald-950 flex items-center gap-4 transition-all duration-300 hover:scale-105 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]"
          >
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase">
              <EditableText path="hero.buttonText" content={hero.buttonText} tag="span" /> 
            </span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300"/>
          </Link>
          
          {/* Vertical Separator */}
          <div className="hidden sm:block h-8 w-[1px] bg-amber-500/40"></div>

          {/* Secondary Link */}
          <Link 
            to="/story" 
            className="group py-2 px-2"
          >
             <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5F5F0]/70 group-hover:text-amber-400 transition-colors duration-300">Câu Chuyện</span>
          </Link>

        </div>
      </div>
      
      {/* Absolute Vertical Text */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block z-30 opacity-0 animate-fade-in-up mix-blend-overlay" style={{ animationDelay: '1.2s' }}>
         <span className="text-vertical font-sans text-xs font-bold tracking-[0.5em] text-white/50 uppercase">
            Bắc Kạn • Viet Nam
         </span>
      </div>

    </div>
  );
};

export default Hero;
