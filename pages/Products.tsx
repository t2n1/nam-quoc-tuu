import React from 'react';
import { useData } from '../context/DataContext';
import { ArrowUpRight, Wine, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const { products, siteContent } = useData(); 
  const { productsPage } = siteContent;

  return (
    <div className="bg-[#f6f5f1] min-h-screen pt-20">
      
      {/* Editorial Header */}
      <div className="pt-32 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <span className="font-script text-8xl text-emerald-900/5 absolute top-0 left-1/2 -translate-x-1/2 -z-10 whitespace-nowrap">{productsPage.header.tagline}</span>
          <h1 className="font-display text-7xl md:text-9xl text-emerald-950 mb-6 tracking-tighter">
            {productsPage.header.title}
          </h1>
          <p className="font-serif italic text-2xl text-amber-700 font-light">
            {productsPage.header.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-32">
        <div className="space-y-48">
          {products.map((product, idx) => (
            <div key={product.id} className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-40 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              {/* Image Stage */}
              <div className="w-full lg:w-1/2 relative group perspective-1000">
                <div className="absolute inset-0 bg-amber-200/20 blur-[80px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000"></div>
                
                {/* Numbering */}
                <div className={`absolute -top-20 font-display text-[12rem] text-emerald-900/5 leading-none select-none z-0 ${idx % 2 === 0 ? '-left-20' : '-right-20'}`}>
                  0{idx + 1}
                </div>

                <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:rotate-1">
                   <div className="absolute inset-0 border-[1px] border-white/20 z-20 rounded-[2rem] pointer-events-none"></div>
                   <img 
                       src={product.image} 
                       alt={product.name} 
                       className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-60"></div>
                   
                   <div className="absolute bottom-8 left-8 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={14} className="text-amber-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{product.type} Edition</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full lg:w-1/2 relative">
                <h2 className="font-display text-5xl lg:text-7xl text-emerald-950 mb-2 leading-[0.9]">
                  {product.name}
                </h2>
                <div className="font-serif text-3xl text-amber-600 italic mb-10">
                   {product.volume}
                </div>

                <p className="text-stone-600 text-lg font-light leading-relaxed mb-12 border-l border-amber-500/30 pl-6">
                   {product.description}
                </p>

                {/* Taste Profile Visualization */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200/50 mb-12">
                   <div className="flex items-center gap-3 mb-6">
                      <Wine size={20} className="text-emerald-900"/>
                      <span className="font-bold text-emerald-950 uppercase tracking-widest text-xs">Taste Profile</span>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div>
                         <div className="flex justify-between text-xs text-stone-500 mb-2 font-bold uppercase tracking-wider">
                            <span>Độ Êm</span>
                            <span>9/10</span>
                         </div>
                         <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-800 w-[90%] rounded-full"></div>
                         </div>
                      </div>
                      <div>
                         <div className="flex justify-between text-xs text-stone-500 mb-2 font-bold uppercase tracking-wider">
                            <span>Hương Thảo Mộc</span>
                            <span>10/10</span>
                         </div>
                         <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-600 w-[95%] rounded-full"></div>
                         </div>
                      </div>
                      <div className="col-span-2">
                         <div className="flex justify-between text-xs text-stone-500 mb-2 font-bold uppercase tracking-wider">
                            <span>Độ Ngọt Hậu</span>
                            <span>High</span>
                         </div>
                         <div className="h-1 bg-stone-100 rounded-full overflow-hidden">
                            <div className="h-full bg-stone-800 w-[85%] rounded-full"></div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-5">
                  <Link to="/contact" className="px-10 py-4 bg-emerald-950 text-white hover:bg-amber-700 transition-colors shadow-xl flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rounded-full group">
                    Đặt Hàng <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Premium Section */}
        <div className="mt-32">
           <div className="bg-emerald-950 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
             
             <div className="relative z-10 max-w-4xl mx-auto">
               <span className="font-script text-5xl text-amber-500/50 block mb-4">{productsPage.b2b.tagline}</span>
               <h3 className="font-display text-4xl md:text-6xl text-cream-50 mb-8">{productsPage.b2b.title}</h3>
               <p className="text-emerald-100/60 mb-12 font-light text-xl leading-relaxed">
                 {productsPage.b2b.content}
               </p>
               <Link to="/contact" className="inline-block px-12 py-5 bg-cream-50 text-emerald-950 hover:bg-amber-500 hover:text-white transition-all uppercase tracking-[0.25em] text-xs font-bold rounded-full shadow-lg">
                 {productsPage.b2b.buttonText}
               </Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Products;