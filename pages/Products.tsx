
import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowUpRight, Wine, Sparkles, Award, Eye, MoveDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const { products, siteContent } = useData(); 
  const { productsPage } = siteContent;

  return (
    <div className="bg-emerald-950 min-h-screen text-amber-50 relative overflow-hidden">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none z-0"></div>

      {/* 1. CINEMATIC HEADER (Redesigned) */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden z-10">
        
        {/* Ambient Background */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[30vh] bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber-600/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 text-center animate-fade-in-up max-w-[1200px] mx-auto">
          
          {/* Tagline with ornaments */}
          <div className="flex items-center justify-center gap-6 mb-10 opacity-80">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-amber-500/50"></div>
            <div className="flex items-center gap-2">
               <Star size={10} className="text-amber-500 fill-amber-500" />
               <span className="font-sans text-[10px] font-bold tracking-[0.5em] uppercase text-amber-400">
                  {productsPage.header.tagline}
               </span>
               <Star size={10} className="text-amber-500 fill-amber-500" />
            </div>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-amber-500/50"></div>
          </div>

          {/* Main Title - Massive & Elegant - FIXED LEADING FOR VIETNAMESE */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] xl:text-[11rem] leading-[1.15] text-white tracking-tighter mb-8 drop-shadow-2xl relative group cursor-default pb-4">
            <span className="block relative z-10 bg-gradient-to-b from-white via-cream-100 to-stone-300 bg-clip-text text-transparent group-hover:to-amber-200 transition-all duration-1000">
               {productsPage.header.title}
            </span>
            {/* Echo Text for Depth */}
            <span className="absolute top-4 left-1/2 -translate-x-1/2 text-emerald-900/20 blur-sm z-0 whitespace-nowrap pointer-events-none select-none">
               {productsPage.header.title}
            </span>
          </h1>

          {/* Subtitle - Refined Serif */}
          <div className="relative inline-block mt-4">
             <span className="hidden md:block absolute -left-12 -top-8 text-7xl text-amber-500/10 font-script -rotate-12 pointer-events-none select-none">Premium</span>
             <p className="font-serif italic text-xl md:text-2xl lg:text-4xl text-emerald-100/80 font-light leading-relaxed max-w-4xl mx-auto border-t border-b border-white/5 py-8">
                 {productsPage.header.subtitle}
             </p>
             <span className="hidden md:block absolute -right-12 -bottom-6 text-7xl text-amber-500/10 font-script rotate-6 pointer-events-none select-none">Selection</span>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 animate-bounce flex flex-col items-center gap-3 opacity-60">
           <span className="text-[9px] uppercase tracking-[0.3em] text-amber-500 font-bold">Khám phá</span>
           <MoveDown size={24} className="text-amber-500" />
        </div>
      </section>

      {/* 2. PRODUCT EXHIBITION */}
      <section className="py-20 md:py-32 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-emerald-950 to-[#032e24]">
        <div className="max-w-[1400px] mx-auto space-y-20 md:space-y-40 lg:space-y-64">
          {products.map((product, idx) => (
            <div key={product.id} className={`flex flex-col lg:flex-row items-center gap-12 md:gap-20 lg:gap-40 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Product Visual */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-amber-500/5 blur-[100px] rounded-full group-hover:bg-amber-500/15 transition-all duration-[2s]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-black/40 blur-3xl rounded-[50%]"></div>
                
                <Link to={`/products/${product.id}`} className="relative z-10 aspect-[3/4] flex items-center justify-center p-12 transition-transform duration-[1.5s] group-hover:scale-105 block cursor-pointer">
                   <img src={product.image} alt={product.name} className="h-full w-full object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)] brightness-90 group-hover:brightness-105 transition-all" />
                   
                   <div className="absolute -top-10 -right-10 md:top-0 md:right-0">
                      <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border border-white/5 bg-emerald-900/50 backdrop-blur-xl flex flex-col items-center justify-center text-center p-4 animate-spin-slow shadow-2xl">
                         <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-1">Spirit of</span>
                         <span className="font-script text-xl md:text-3xl text-white">Mountain</span>
                      </div>
                   </div>
                </Link>
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-1/2">
                <div className="mb-10 flex items-center gap-4">
                    <span className="text-amber-500 font-serif italic text-2xl">Vol. {product.volume}</span>
                    <div className="h-px flex-1 bg-white/5"></div>
                </div>

                <Link to={`/products/${product.id}`} className="block hover:text-amber-500 transition-colors">
                   {/* FIXED LEADING */}
                   <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white mb-6 md:mb-10 leading-[1.1] tracking-tight pb-2">{product.name}</h2>
                </Link>
                
                {/* Updated Typography for Description */}
                <p className="font-sans font-light tracking-wide text-lg md:text-xl text-emerald-100/70 leading-relaxed mb-10 md:mb-16 text-justify max-w-xl">
                   {product.description}
                </p>
                
                <div className="grid grid-cols-2 gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-12 lg:mb-16 border-t border-white/5 pt-12 max-w-lg">
                    <div className="group">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-3 group-hover:text-amber-500 transition-colors">Nồng độ</div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-white italic">29 - 35%</div>
                    </div>
                    <div className="group">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 mb-3 group-hover:text-amber-500 transition-colors">Thảo mộc</div>
                        <div className="text-2xl md:text-3xl lg:text-4xl font-serif text-white italic">32 Loại</div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-8 items-center">
                  <Link to={`/products/${product.id}`} className="px-12 py-5 bg-white text-emerald-950 hover:bg-amber-600 hover:text-white transition-all text-sm font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl flex items-center gap-4 group">
                    Xem Chi Tiết <Eye size={20} />
                  </Link>
                  <Link to="/contact" className="text-emerald-400 hover:text-amber-500 transition-all text-xs font-bold uppercase tracking-[0.3em] border-b border-emerald-900 hover:border-amber-500 pb-2">
                    Liên hệ đặt hàng ngay
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 3. PARTNERSHIP BANNER */}
      <section className="bg-emerald-900 py-16 md:py-24 lg:py-32 relative overflow-hidden border-t border-white/5">
         <div className="max-w-6xl mx-auto px-6">
            <div className="bg-emerald-950/50 backdrop-blur-2xl rounded-2xl md:rounded-[3rem] lg:rounded-[4rem] p-8 md:p-12 lg:p-16 xl:p-24 border border-white/5 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"></div>
               <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16 relative z-10">
                  <div className="md:w-2/3 text-center md:text-left">
                     <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">Partnership Opportunities</span>
                     {/* FIXED LEADING */}
                     <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white mb-8 leading-[1.15]">{productsPage.b2b.title}</h3>
                     <p className="text-emerald-100/50 font-sans font-light tracking-wide text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
                       {productsPage.b2b.content}
                     </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center mt-8 md:mt-0">
                     <Link to="/contact" className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-amber-600 hover:bg-amber-500 transition-all flex items-center justify-center text-center p-8 shadow-2xl hover:scale-105 active:scale-95 group">
                        <span className="font-serif italic text-2xl text-white group-hover:scale-110 transition-transform">Liên hệ <br/> Hợp tác</span>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Products;
