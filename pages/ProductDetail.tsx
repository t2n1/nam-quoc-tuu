
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, ShoppingCart, Award, ShieldCheck, Droplets, Leaf, Wind, Utensils, Zap, Star, ChevronRight } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOMetadata from '../components/SEOMetadata';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useData();
  const product = products.find(p => p.id === id);

  if (!product) return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-4xl font-display mb-4">Sản phẩm không tồn tại</h2>
        <Link to="/products" className="text-amber-500 hover:underline">Quay lại bộ sưu tập</Link>
      </div>
    </div>
  );

  const foodPairings = product.pairings || [
     { name: "Thịt Trâu Gác Bếp", description: "Vị khói bếp và mắc khén quyện cùng men lá nồng nàn.", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1000" },
     { name: "Cá Nướng Pa Pỉnh Tộp", description: "Vị ngọt cá suối nướng làm dịu độ nồng của rượu.", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1000" }
  ];

  return (
    <div className="bg-emerald-950 min-h-screen text-amber-50 relative overflow-hidden">
      <SEOMetadata title={product.name} description={product.description} type="product" product={product} />
      
      {/* Mountain Mist Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen z-10">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      </div>

      <div className="pt-24">
        <Breadcrumbs />
      </div>

      {/* 1. HERO PRODUCT SECTION */}
      <section className="pb-20 md:pb-32 px-5 md:px-8 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/5 blur-[150px] rounded-full"></div>
              <div className="relative z-10 aspect-[3/4] flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.6)]" />
              </div>
              
            </div>

            <div className="space-y-12">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-6 mb-6">
                   <span className="text-amber-500 font-serif italic text-3xl">Dung tích: {product.volume}</span>
                   <div className="h-px flex-1 bg-white/5"></div>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white mb-10 leading-tight md:leading-none pt-2">{product.name}</h1>
                
                <div className="flex flex-wrap gap-4 mb-12">
                   <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[9px] tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/5">
                      <Award size={14} /> Heritage Quality
                   </div>
                   <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-[9px] tracking-widest bg-white/5 px-6 py-3 rounded-full border border-white/5">
                      <ShieldCheck size={14} /> OCOP 4 Stars
                   </div>
                </div>

                {/* CHANGED: Added tracking-wide */}
                <p className="font-sans font-light tracking-wide text-emerald-100/70 text-lg md:text-xl leading-relaxed mb-16 text-justify">
                  {product.description}
                </p>
              </div>

              <div className="mb-16">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white transition-all duration-700">
                     <Utensils className="text-amber-500 mb-6 group-hover:text-emerald-950 transition-colors" size={24} />
                     <h4 className="font-serif text-xl text-white group-hover:text-emerald-950 transition-colors mb-2">Ẩm thực đi kèm</h4>
                     <p className="font-sans text-emerald-100/50 group-hover:text-stone-500 text-sm font-light tracking-wide transition-colors">
                        {foodPairings.map(f => f.name).join(', ')}
                     </p>
                  </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/contact" className="px-16 py-6 bg-amber-600 text-white hover:bg-amber-500 transition-all text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-4 shadow-2xl">
                   <ShoppingCart size={18} /> Đặt hàng ngay
                </Link>
                <button className="px-10 py-6 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-emerald-950 transition-all">
                   Tải Catalog PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOOD PAIRING SECTION */}
      <section className="py-16 md:py-28 lg:py-40 bg-stone-50 text-emerald-950 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-5"></div>
         <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-32 gap-6 md:gap-8 lg:gap-12">
               <div className="max-w-2xl text-center md:text-left">
                  <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">Perfect Pairing</span>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl leading-tight md:leading-none pt-1">Ẩm thực <br/> <span className="italic font-serif text-amber-600">Tương hợp.</span></h2>
               </div>
               <p className="text-stone-400 font-light text-xl italic max-w-sm text-center md:text-left">
                  Những món ăn đậm đà bản sắc Tây Bắc sẽ nâng tầm hương vị của rượu men lá.
               </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
               {foodPairings.map((food, i) => (
                  <div key={i} className="group relative rounded-[2rem] overflow-hidden shadow-xl bg-emerald-950 border border-white/5 p-8 hover:-translate-y-2 transition-transform duration-500">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-[0.05] pointer-events-none"></div>
                     <div className="absolute top-4 right-6 font-display text-6xl text-white/[0.05] font-bold leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                     </div>
                     <div className="relative z-10">
                        <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Utensils size={18} />
                        </div>
                        <h4 className="font-serif text-2xl text-white mb-2">{food.name}</h4>
                        <p className="font-sans text-emerald-100/70 text-sm font-light tracking-wide leading-relaxed">{food.description}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 3. FINAL CALL TO ACTION */}
      <section className="py-20 md:py-32 lg:py-48 bg-emerald-950 relative border-t border-white/5">
         <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 text-center">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white mb-16 leading-tight">Mang tinh hoa <br/> <span className="text-amber-600 font-script text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] block -mt-2 md:-mt-8">Về nhà.</span></h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 pt-10 md:pt-16 border-t border-white/5">
               <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-emerald-400 hover:text-amber-500 transition-colors flex items-center gap-2">
                  <ArrowLeft size={14} /> Trở lại bộ sưu tập
               </Link>
               <Link to="/contact" className="px-16 py-6 bg-white text-emerald-950 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-2xl">
                  Gửi yêu cầu tư vấn
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ProductDetail;
