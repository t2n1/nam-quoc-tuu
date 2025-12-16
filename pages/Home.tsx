
import React from 'react';
import Hero from '../components/Hero';
import { ArrowRight, Leaf, Droplets, Award, Hexagon, Quote, Wine, Sparkles, Newspaper, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Home: React.FC = () => {
  const { siteContent, blogPosts, testimonials } = useData();
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
               <div className="sticky top-32">
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
                 <div className="absolute -bottom-10 -right-10 w-48 bg-white p-6 shadow-xl z-20 hidden md:block border-l-2 border-amber-600">
                    <p className="font-serif italic text-emerald-950 text-sm leading-relaxed">
                      {home.intro.floatingText}
                    </p>
                 </div>
               </div>
            </div>

            {/* Right Column: Editorial Text */}
            <div className="lg:col-span-7 relative z-10 order-1 lg:order-2 flex flex-col justify-center">
              <div className="mb-12">
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
              </div>
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
           <div className="text-center mb-20">
             <span className="font-script text-6xl text-amber-500/20 block mb-2">{home.values.subtitle}</span>
             <h2 className="font-display text-5xl md:text-6xl text-white mb-6">{home.values.title}</h2>
             <p className="text-emerald-100/50 max-w-2xl mx-auto font-light text-lg">{home.values.description}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {home.values.items.map((item, idx) => (
                <div key={idx} className="group relative p-10 bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                   <div className="mb-8 p-4 bg-emerald-900/50 rounded-full w-fit group-hover:bg-emerald-800 transition-colors">
                     {getIcon(item.icon)}
                   </div>
                   <h3 className="font-serif text-2xl text-white mb-4">{item.title}</h3>
                   <p className="text-emerald-100/60 font-light leading-relaxed group-hover:text-emerald-100/80 transition-colors">
                     {item.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Section 3: Collection Preview - Full Screen Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
             src={home.collection.bgImage}
             alt="Background"
             className="w-full h-full object-cover grayscale brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-emerald-950/20 mix-blend-color"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-[1400px] px-6 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <div className="text-white order-2 md:order-1">
              <span className="font-script text-7xl text-amber-500/40 block mb-2 transform -rotate-2">{home.collection.tagline}</span>
              <h2 className="font-display text-7xl md:text-9xl leading-[0.8] mb-8 mix-blend-overlay whitespace-pre-line">
                {home.collection.title}
              </h2>
              <div className="w-24 h-px bg-amber-500 mb-8 opacity-50"></div>
              <p className="text-xl font-light text-white/70 max-w-md mb-12 border-l border-white/20 pl-6 leading-relaxed">
                {home.collection.description}
              </p>
              <Link to="/products" className="inline-block px-12 py-4 border border-white/30 bg-white/5 backdrop-blur hover:bg-white hover:text-emerald-950 transition-all uppercase tracking-[0.2em] text-xs font-bold">
                 {home.collection.buttonText}
              </Link>
           </div>
           
           <div className="relative order-1 md:order-2 group">
              <div className="absolute inset-0 bg-amber-600/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 w-full max-w-sm mx-auto aspect-[3/4] border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-t-full rounded-b-full overflow-hidden hover:scale-105 transition-transform duration-700">
                  <img 
                    src="https://picsum.photos/id/431/600/800" 
                    alt="Product" 
                    className="w-full h-full object-cover rounded-t-full rounded-b-full brightness-75 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute bottom-10 left-0 w-full text-center">
                    <span className="inline-block px-4 py-1 bg-amber-500 text-emerald-950 text-[10px] font-bold uppercase tracking-widest">Limited Edition</span>
                  </div>
              </div>
           </div>
        </div>
      </section>

      {/* New Section: Testimonials / Social Proof */}
      <section className="py-24 bg-cream-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-[80px]"></div>
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Testimonials</span>
            <h2 className="font-display text-5xl text-emerald-950">Niềm Tin Khách Hàng</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
               <div key={idx} className="bg-white p-10 rounded-xl shadow-sm border border-stone-100 relative group hover:shadow-lg transition-all duration-500 hover:-translate-y-2">
                  <Quote className="text-amber-500/20 w-16 h-16 absolute top-6 right-6 rotate-180" />
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-stone-600 font-serif italic text-lg leading-relaxed mb-8 relative z-10">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-100">
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-950 text-sm">{item.name}</h4>
                      <p className="text-xs text-stone-400 uppercase tracking-wider">{item.role}</p>
                    </div>
                  </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: News & Culture */}
      <section className="py-32 bg-stone-50">
         <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Blog & News</span>
                  <h2 className="font-display text-5xl text-emerald-950">Góc Nhìn & Văn Hóa</h2>
               </div>
               {/* 
               <Link to="/news" className="text-emerald-900 border-b border-emerald-900/30 pb-1 hover:text-amber-600 hover:border-amber-600 transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  Xem tất cả bài viết <ArrowRight size={14} />
               </Link>
               */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {latestPosts.map((news) => (
                  <Link to={`/news/${news.slug}`} key={news.id} className="group cursor-pointer">
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
               ))}
            </div>
         </div>
      </section>

      {/* Section 5: Traceability Banner */}
      <section className="py-32 bg-cream-100 relative overflow-hidden">
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-[20rem] text-emerald-900/5 font-display leading-none select-none">{home.traceabilityBanner.bgText}</div>
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Quote className="text-amber-600/50 w-12 h-12 mx-auto mb-8 rotate-180" />
          
          <h2 className="font-display text-4xl md:text-6xl text-emerald-950 mb-10 leading-tight">
            {home.traceabilityBanner.quote}
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/check" className="px-10 py-4 bg-emerald-950 text-white rounded-full hover:bg-amber-700 transition-colors duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl hover:shadow-2xl">
              <Hexagon size={16} /> {home.traceabilityBanner.title}
            </Link>
            <Link to="/process" className="px-10 py-4 border border-emerald-950/30 text-emerald-950 rounded-full hover:bg-emerald-950 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3">
              <Wine size={16} /> Quy trình sản xuất
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
