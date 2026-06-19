
import React, { useState, useCallback } from 'react';
import Hero from '../components/Hero';
import { ArrowRight, Leaf, Droplets, Award, Hexagon, Quote, Wine, Sparkles, Newspaper, Star, Wind, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Reveal from '../components/Reveal';
import VietJapanMap from '../components/VietJapanMap';

const Home: React.FC = () => {
  const { siteContent, blogPosts, testimonials, products } = useData();
  const [activeIdx, setActiveIdx] = useState(0);
  const prev = useCallback(() => setActiveIdx(i => (i - 1 + products.length) % products.length), [products.length]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % products.length), [products.length]);
  const { home } = siteContent;

  // Helper to map icon name to component
  const getIcon = (name: string) => {
    switch(name) {
      case 'Leaf': return <Leaf size={40} className="text-amber-400" />;
      case 'Droplets': return <Droplets size={40} className="text-amber-400" />;
      case 'Award': return <Award size={40} className="text-amber-400" />;
      default: return <Sparkles size={40} className="text-amber-400" />;
    }
  }

  // Get latest 3 posts
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="bg-cream-200 overflow-x-hidden">
      <Hero />

      {/* Section 1: Editorial Introduction - Sticky Layout */}
      <section className="py-24 md:py-40 relative px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Image Composition */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
               <Reveal variant="fade-left"><div className="sticky top-32">
                 <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-t-full border border-emerald-900/10 shadow-2xl">
                   <img 
                     src={home.intro.image} 
                     alt="Men lá rừng" 
                     className="w-full h-full object-cover brightness-95 hover:scale-105 transition-transform duration-[2s] ease-out"
                   />
                   {/* Overlay Texture */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                 </div>
                 
                 {/* Floating Element */}
                 <div className="absolute -bottom-10 -right-10 w-48 bg-cream-50 p-6 shadow-xl z-20 hidden md:block border-l-2 border-amber-600">
                    <p className="font-serif italic text-emerald-950 text-sm leading-relaxed">
                      {home.intro.floatingText}
                    </p>
                 </div>
               </div></Reveal>
            </div>

            {/* Right Column: Editorial Text */}
            <div className="lg:col-span-7 relative z-10 order-1 lg:order-2 flex flex-col justify-center">
              <Reveal variant="fade-right" delay={150}><div className="mb-12">
                <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">{home.intro.tagline}</span>
                <h2 className="font-display text-6xl md:text-8xl text-emerald-950 leading-[0.85] mb-8">
                  {home.intro.title} <br/> 
                  <span className="italic font-serif text-emerald-800/80 ml-12">{home.intro.subtitle}</span>
                </h2>
                <div className="w-24 h-px bg-amber-600"></div>
              </div>
              
              <div className="prose prose-lg prose-stone max-w-none">
                <p className="text-2xl font-serif italic text-emerald-900/70 mb-8 leading-relaxed">
                  {home.intro.quote}
                </p>

                <div className="columns-1 md:columns-2 gap-12 text-stone-600 font-light text-lg leading-relaxed mb-12">
                  <p className="mb-6">{home.intro.body1}</p>
                  <p>{home.intro.body2}</p>
                </div>
              </div>
              
              <div>
                <Link to="/story" className="group inline-flex items-center gap-4 px-10 py-4 border border-emerald-950 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-all duration-500 rounded-full">
                  <span className="text-xs font-bold uppercase tracking-widest">Đọc câu chuyện</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div></Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Core Values - Glassmorphism Cards */}
      <section className="bg-emerald-950 py-32 relative overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
           <Reveal variant="blur-in"><div className="text-center mb-20">
             <span className="font-script text-6xl text-amber-500/20 block mb-2">{home.values.subtitle}</span>
             <h2 className="font-display text-5xl md:text-6xl text-white mb-6">{home.values.title}</h2>
             <p className="text-emerald-100/50 max-w-2xl mx-auto font-light text-lg">{home.values.description}</p>
           </div></Reveal>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {home.values.items.map((item, idx) => (
                <Reveal key={idx} variant="scale-up" delay={idx * 120}>
                <div className="group relative p-10 bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                   <div className="mb-8 p-4 bg-emerald-900/50 rounded-full w-fit group-hover:bg-emerald-800 transition-colors">
                     {getIcon(item.icon)}
                   </div>
                   <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                   <p className="text-emerald-100/60 font-light leading-relaxed group-hover:text-emerald-100/80 transition-colors">
                     {item.desc}
                   </p>
                </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* Section: 32 Vị Thảo Mộc Bí Truyền */}
      <section className="bg-emerald-950 py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 text-emerald-800/10 font-display text-[22rem] leading-none select-none pointer-events-none translate-x-1/3 -translate-y-1/4">32</div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <Reveal variant="blur-in"><div className="text-center mb-20">
            <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">Linh Hồn Của Rượu</span>
            <h2 className="font-display text-6xl md:text-8xl text-white leading-[0.85]">
              32 Vị Thảo Mộc <br/>
              <span className="font-serif italic text-amber-500">Bí Truyền.</span>
            </h2>
          </div></Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Lá Men Rừng", desc: "Hương thơm nồng nàn đặc trưng của núi rừng Chợ Đồn." },
              { name: "Sâm Cau", desc: "Tăng cường sức khỏe, tạo hậu vị ngọt sâu." },
              { name: "Thảo Quả", desc: "Gia tăng sự ấm áp và chiều sâu của hương vị." },
              { name: "Quế Nhục", desc: "Hương cay nhẹ, hỗ trợ tuần hoàn máu." },
            ].map((herb, idx) => (
              <Reveal key={idx} variant="scale-up" delay={idx * 100}>
              <div className="group bg-emerald-900/30 border border-emerald-800/30 rounded-2xl p-8 hover:bg-emerald-900/50 hover:-translate-y-1 transition-all duration-500">
                <div className="w-12 h-12 bg-amber-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600/30 transition-colors">
                  <Wind size={24} className="text-amber-500" />
                </div>
                <h3 className="font-serif text-xl text-white mb-3">{herb.name}</h3>
                <p className="text-emerald-300/60 font-light leading-relaxed text-sm">{herb.desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Vươn Ra Biển Lớn */}
      <section className="relative overflow-hidden bg-cream-100 min-h-[560px] flex items-center">
        {/* Map as full-section background */}
        <div className="absolute inset-0 pointer-events-none">
          <VietJapanMap />
        </div>
        {/* Left gradient — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/85 to-cream-100/10 pointer-events-none" />
        {/* Top / bottom fades — blends into adjacent sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/55 via-transparent to-cream-100/55 pointer-events-none" />

        <div className="relative z-10 w-full py-32 max-w-[1400px] mx-auto px-6">
          <Reveal variant="fade-right"><div className="max-w-xl">
            <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">Tầm Nhìn Toàn Cầu</span>
            <h2 className="font-display text-6xl md:text-8xl text-emerald-950 leading-[0.85] mb-4">
              Vươn Ra<br/>Biển Lớn
            </h2>
            <p className="font-serif italic text-amber-700 text-xl md:text-2xl mb-8">Chinh phục thị trường Nhật Bản</p>
            <p className="text-stone-600 font-light leading-relaxed mb-10 text-lg">
              Tự hào là sản phẩm rượu truyền thống đầu tiên của Bắc Kạn chính thức xuất khẩu sang thị trường Nhật Bản — vượt qua hơn 100 chỉ tiêu kiểm định khắt khe về an toàn thực phẩm để khẳng định chất lượng và vị thế quốc tế.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="bg-cream-50/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-300/40 shadow-sm">
                <p className="font-display text-4xl text-emerald-950 font-bold mb-1">Tokyo</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Thị Trường Xuất Khẩu</p>
              </div>
              <div className="bg-cream-50/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-300/40 shadow-sm">
                <p className="font-display text-4xl text-emerald-950 font-bold mb-1">100+</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Chỉ Tiêu Kiểm Định</p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              {[0, 1, 2].map(i => (
                <div key={i} className={`rounded-full transition-all ${i === 2 ? 'w-8 h-2 bg-emerald-950' : 'w-2 h-2 bg-cream-300'}`} />
              ))}
            </div>
          </div></Reveal>
        </div>
      </section>

      {/* Section 3: Wine Cellar Carousel */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-emerald-950 select-none">
        {/* Background texture */}
        <div className="absolute inset-0 z-0">
          <img src={home.collection.bgImage} alt="" className="w-full h-full object-cover grayscale brightness-[0.08]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10" />
          {/* Shelf line */}
          <div className="absolute bottom-[28%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />
          <div className="absolute bottom-[28%] left-0 right-0 h-8 bg-gradient-to-b from-black/30 to-transparent" />
        </div>

        {/* Header */}
        <div className="relative z-10 text-center mb-6 md:mb-10">
          <span className="font-script text-5xl text-amber-500/50 block mb-1">{home.collection.tagline}</span>
          <h2 className="font-display text-4xl md:text-6xl text-white/90 leading-tight tracking-tight">{home.collection.title.replace('\n', ' ')}</h2>
        </div>

        {/* Carousel */}
        <div className="relative z-10 w-full flex items-end justify-center" style={{ height: '52vh' }}>
          {/* Spotlight on active */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-700"
            style={{
              width: '260px',
              height: '100%',
              background: 'radial-gradient(ellipse 50% 90% at 50% 100%, rgba(251,191,36,0.18) 0%, transparent 70%)',
            }}
          />

          {products.map((product, idx) => {
            const offset = idx - activeIdx;
            const wrappedOffset = ((offset + Math.floor(products.length / 2)) % products.length) - Math.floor(products.length / 2);
            const absOffset = Math.abs(wrappedOffset);
            if (absOffset > 2) return null;
            const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.72 : 0.52;
            const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.45 : 0.2;
            const xPct = wrappedOffset * 170;
            const zIndex = 10 - absOffset;
            const isActive = absOffset === 0;
            return (
              <div
                key={product.id}
                onClick={() => setActiveIdx(idx)}
                className="absolute bottom-0 cursor-pointer"
                style={{
                  transform: `translateX(${xPct}px) scale(${scale})`,
                  transformOrigin: 'bottom center',
                  opacity,
                  zIndex,
                  transition: 'transform 0.6s cubic-bezier(0.34,1.3,0.64,1), opacity 0.6s ease',
                  width: '180px',
                }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    boxShadow: isActive ? '0 0 60px 0 rgba(251,191,36,0.12), 0 40px 80px -20px rgba(0,0,0,0.7)' : '0 20px 40px -10px rgba(0,0,0,0.5)',
                    padding: isActive ? '12px 12px 0' : '8px 8px 0',
                    backdropFilter: isActive ? 'blur(8px)' : 'none',
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-contain"
                    style={{ height: '38vh', display: 'block' }}
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Active product info */}
        <div className="relative z-10 mt-8 text-center transition-all duration-500" style={{ minHeight: '80px' }}>
          <p className="font-display text-2xl md:text-3xl text-white/90 leading-tight">
            {products[activeIdx]?.name}
          </p>
          <p className="font-serif italic text-amber-400/70 text-base mt-1">
            {products[activeIdx]?.volume}
          </p>
        </div>

        {/* Navigation */}
        <div className="relative z-10 flex items-center gap-8 mt-6">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur flex items-center justify-center text-white/60 hover:border-amber-500/60 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className="transition-all duration-300"
                style={{
                  width: idx === activeIdx ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: idx === activeIdx ? 'rgba(251,191,36,0.8)' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur flex items-center justify-center text-white/60 hover:border-amber-500/60 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* CTA */}
        <div className="relative z-10 mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 bg-white/5 backdrop-blur text-white/70 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all uppercase tracking-[0.2em] text-[10px] font-bold rounded-full"
          >
            {home.collection.buttonText}
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* New Section: Testimonials / Social Proof */}
      <section className="py-24 bg-cream-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-[80px]"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <Reveal variant="blur-in"><div className="text-center mb-16">
            <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Testimonials</span>
            <h2 className="font-display text-5xl text-emerald-950">Niềm Tin Khách Hàng</h2>
          </div></Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
               <Reveal key={idx} variant="scale-up" delay={idx * 120}>
               <div className="bg-cream-50 p-10 rounded-xl shadow-sm border border-cream-300/40 relative group hover:shadow-md transition-all duration-500 hover:-translate-y-2">
                  <Quote className="text-amber-500/20 w-16 h-16 absolute top-6 right-6 rotate-180" />
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-stone-600 font-serif italic text-lg leading-relaxed mb-8 relative z-10">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-300/60">
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm">{item.name}</h4>
                      <p className="text-xs text-stone-400 uppercase tracking-wider">{item.role}</p>
                    </div>
                  </div>
               </div>
               </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: News & Culture */}
      <section className="py-32 bg-cream-50">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <Reveal variant="fade-up"><div>
                  <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Blog & News</span>
                  <h2 className="font-display text-5xl text-emerald-950">Góc Nhìn & Văn Hóa</h2>
               </div></Reveal>
               {/* 
               <Link to="/news" className="text-emerald-900 border-b border-emerald-900/30 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  Xem tất cả bài viết <ArrowRight size={14} />
               </Link>
               */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {latestPosts.map((news, idx) => (
                  <Reveal key={news.id} variant="fade-up" delay={idx * 150}>
                  <Link to={`/news/${news.slug}`} className="group cursor-pointer block">
                     <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6 relative">
                        <img 
                           src={news.image} 
                           alt={news.title} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-950">
                           {news.category}
                        </div>
                     </div>
                     <div className="flex items-center gap-3 text-xs text-stone-500 mb-3 font-medium">
                        <Newspaper size={12} /> {news.date}
                     </div>
                     <h3 className="font-serif text-xl text-emerald-950 mb-3 group-hover:text-amber-700 transition-colors leading-snug">
                        {news.title}
                     </h3>
                     <p className="text-stone-500 text-sm leading-relaxed line-clamp-3">
                        {news.excerpt}
                     </p>
                  </Link>
                  </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* Section 5: Traceability Banner */}
      <section className="py-32 bg-cream-100 relative overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[20rem] text-emerald-900/5 font-display leading-none select-none">{home.traceabilityBanner.bgText}</div>
        
        <Reveal variant="blur-in"><div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Quote className="text-amber-600/50 w-12 h-12 mx-auto mb-8 rotate-180" />
          
          <h2 className="font-display text-4xl md:text-6xl text-emerald-950 mb-10 leading-tight">
            {home.traceabilityBanner.quote}
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/check" className="px-10 py-4 bg-emerald-950 text-white rounded-full hover:bg-amber-700 transition-colors duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl hover:shadow-2xl">
              <Hexagon size={16} /> {home.traceabilityBanner.title}
            </Link>
            <Link to="/process" className="px-10 py-4 border border-emerald-950/30 text-emerald-950 rounded-full hover:bg-emerald-950 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
              <Wine size={16} /> Quy Trình Tạo Tác
            </Link>
          </div>
        </div></Reveal>
      </section>
    </div>
  );
};

export default Home;
