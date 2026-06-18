
import React from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { useData } from '../context/DataContext';

const FloatingCTA: React.FC = () => {
  const { siteContent } = useData();
  const { general } = siteContent;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] flex flex-col gap-4 items-center">
      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className="w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-full flex items-center justify-center hover:bg-amber-600 transition-all shadow-2xl group"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Zalo CTA */}
      <a 
        href={`https://zalo.me/${general.hotline.replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0068FF] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,104,255,0.4)] hover:scale-110 active:scale-95 transition-all relative group"
      >
        <MessageCircle size={28} />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-emerald-950 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          Tư vấn Zalo
        </span>
        <span className="absolute inset-0 rounded-full bg-[#0068FF] animate-ping opacity-20"></span>
      </a>

      {/* Phone CTA */}
      <a 
        href={`tel:${general.hotline}`}
        className="w-14 h-14 bg-amber-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(180,83,9,0.4)] hover:scale-110 active:scale-95 transition-all relative group"
      >
        <Phone size={24} />
        <span className="absolute right-full mr-4 px-4 py-2 bg-white text-emerald-950 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
          Gọi Hotline
        </span>
      </a>
    </div>
  );
};

export default FloatingCTA;
