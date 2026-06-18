
import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
      
      <div className="relative z-10 animate-fade-in-up">
        <Wine size={80} className="text-amber-500/20 mx-auto mb-8 animate-float w-16 h-16 md:w-20 md:h-20" />
        <h1 className="font-display text-[6rem] sm:text-[8rem] md:text-[10rem] lg:text-[15rem] text-white/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">404</h1>
        
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-6 relative">Chén rượu lỡ làng...</h2>
        <p className="font-serif text-xl text-emerald-100/50 mb-12 max-w-md mx-auto italic leading-relaxed">
          Tiếc quá, trang bạn đang tìm kiếm đã không còn hiện diện hoặc đã được di chuyển sang một hầm rượu khác.
        </p>
        
        <Link to="/" className="inline-flex items-center gap-3 px-10 py-4 bg-amber-600 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-500 transition-all shadow-2xl">
          <ArrowLeft size={18} /> Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
