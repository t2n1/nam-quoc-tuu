
import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import SEOMetadata from '../components/SEOMetadata';
import { ArrowRight, Leaf, Droplets, Award, Hexagon, Quote, Wine, Sparkles, Star, ChevronDown, Package, Globe, Wind, Zap, Utensils, Calendar, User, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { EditableText, EditableImage } from '../components/LiveEditor';

const Home: React.FC = () => {
   const { siteContent, faqs, blogPosts, testimonials } = useData();
   const { home } = siteContent;

   // FAQ accordion
   const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
   const toggleFaq = (index: number) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index);
   };

   // Scroll Reveal Logic
   const scrollRefs = useRef<(HTMLDivElement | null)[]>([]);
   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add('active');
            }
         });
      }, { threshold: 0.1 });

      scrollRefs.current.forEach(ref => {
         if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
   }, []);

   // Japan Slider
   const [japanSlide, setJapanSlide] = useState(0);
   const [isAnimating, setIsAnimating] = useState(false);
   const japanImages = home.japanExport?.images || [];

   useEffect(() => {
      if (japanImages.length <= 1) return;
      const interval = setInterval(() => {
         setIsAnimating(true);
         setTimeout(() => {
            setJapanSlide(curr => (curr + 1) % japanImages.length);
            setIsAnimating(false);
         }, 500);
      }, 5000);
      return () => clearInterval(interval);
   }, [japanImages.length]);

   const changeJapanSlide = (index: number) => {
      if (index === japanSlide) return;
      setIsAnimating(true);
      setTimeout(() => {
         setJapanSlide(index);
         setIsAnimating(false);
      }, 300);
   }

   const getIcon = (name: string) => {
      switch (name) {
         case 'Leaf': return <Leaf size={40} className="text-amber-400" />;
         case 'Droplets': return <Droplets size={40} className="text-amber-400" />;
         case 'Award': return <Award size={40} className="text-amber-400" />;
         default: return <Sparkles size={40} className="text-amber-400" />;
      }
   }

   // Botanical Data from Content
   const botanicalHerbs = home.botanicals || [];

   return (
      <div className="bg-emerald-950 text-amber-50 overflow-x-hidden">
         <SEOMetadata />
         <Hero />

         {/* 1. Intro Section */}
         <section ref={el => scrollRefs.current[0] = el} className="reveal-on-scroll py-16 md:py-28 lg:py-48 relative px-6 z-10 bg-emerald-950">
            <div className="max-w-[1400px] mx-auto">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-32 items-center">
                  <div className="lg:col-span-5 relative group order-2 lg:order-1">
                     <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-t-[12rem] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                        <EditableImage path="home.intro.image" src={home.intro.image} alt="Men lá rừng" className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[2s] ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent pointer-events-none"></div>
                     </div>
                     <div className="absolute -bottom-10 -right-10 w-56 bg-emerald-900 p-8 shadow-2xl z-20 hidden md:block border-l-4 border-amber-600">
                        <div className="font-serif italic text-amber-100 text-lg leading-relaxed">
                           <EditableText path="home.intro.floatingText" content={home.intro.floatingText} multiline />
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-7 relative z-10 order-1 lg:order-2">
                     <div className="mb-12">
                        <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase block mb-8">
                           <EditableText path="home.intro.tagline" content={home.intro.tagline} />
                        </span>
                        {/* FIXED LEADING */}
                        <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-white leading-[1.1] mb-10 pb-2">
                           <EditableText path="home.intro.title" content={home.intro.title} />
                           <span className="italic font-serif text-emerald-400/70 ml-16 block">
                              <EditableText path="home.intro.subtitle" content={home.intro.subtitle} />
                           </span>
                        </h2>
                        <div className="w-32 h-px bg-amber-600/50"></div>
                     </div>
                     <div className="prose prose-2xl prose-invert max-w-none">
                        <div className="font-serif italic text-amber-200/60 mb-12 leading-relaxed border-l-2 border-emerald-800 pl-8">
                           <EditableText path="home.intro.quote" content={home.intro.quote} multiline />
                        </div>
                        <div className="columns-1 md:columns-2 gap-8 md:gap-12 lg:gap-16 text-emerald-100/70 font-sans font-light tracking-wide text-lg md:text-xl leading-relaxed mb-16">
                           <div className="mb-8"><EditableText path="home.intro.body1" content={home.intro.body1} multiline /></div>
                           <div><EditableText path="home.intro.body2" content={home.intro.body2} multiline /></div>
                        </div>
                     </div>
                     <Link to="/story" className="group inline-flex items-center gap-6 px-12 py-5 bg-white text-emerald-950 hover:bg-amber-600 hover:text-white transition-all duration-500 rounded-full shadow-2xl">
                        <span className="text-sm font-bold uppercase tracking-widest">Đọc câu chuyện di sản</span>
                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         {/* 2. NEW: BOTANICAL TREASURE (Interactive Herbs) */}
         <section ref={el => scrollRefs.current[1] = el} className="reveal-on-scroll py-16 md:py-28 lg:py-40 bg-emerald-900/30 border-y border-white/5 relative">
            <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
               <Leaf size={400} className="text-amber-500 rotate-45" />
            </div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-24">
                  <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">
                     <EditableText path="home.headers.botanicalsTagline" content={home.headers?.botanicalsTagline} />
                  </span>
                  {/* FIXED LEADING */}
                  <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-white leading-[1.1]">
                     <EditableText path="home.headers.botanicalsTitle" content={home.headers?.botanicalsTitle} />
                     <span className="italic font-serif text-amber-600 block mt-2">
                        <EditableText path="home.headers.botanicalsSubtitle" content={home.headers?.botanicalsSubtitle} />
                     </span>
                  </h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {botanicalHerbs.map((herb, i) => (
                     <div key={i} className="group p-6 md:p-8 lg:p-10 bg-emerald-950/50 border border-white/5 rounded-3xl hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-4 shadow-xl">
                        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500 transition-colors duration-500">
                           <Wind size={32} className="text-amber-500 group-hover:text-emerald-950 transition-colors duration-500" />
                        </div>
                        <h4 className="font-serif text-2xl text-white mb-4">
                           <EditableText path={`home.botanicals.${i}.name`} content={herb.name} />
                        </h4>
                        <div className="text-emerald-100/50 font-sans font-light tracking-wide text-sm leading-relaxed">
                           <EditableText path={`home.botanicals.${i}.desc`} content={herb.desc} multiline />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 3. Japan Export */}
         <section ref={el => scrollRefs.current[2] = el} className="reveal-on-scroll bg-white py-16 md:py-28 lg:py-40 relative overflow-hidden text-emerald-950">
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/seigaiha.png')] pointer-events-none"></div>
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-20 items-center">
                  <div className="lg:col-span-5 relative">
                     <div className="relative pl-0 xl:pl-16">
                        <div className="flex items-center gap-4 mb-8">
                           <div className="w-4 h-4 rounded-full bg-[#BC002D] shadow-[0_0_20px_rgba(188,0,45,0.4)]"></div>
                           <span className="text-[#BC002D] font-bold uppercase tracking-[0.3em] text-[10px]">Japan Standard Excellence</span>
                        </div>
                        {/* FIXED LEADING */}
                        <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl mb-10 leading-[1.1] text-emerald-950 pb-2">
                           <EditableText path="home.japanExport.title" content={home.japanExport?.title} />
                        </h2>
                        <div className="font-serif text-2xl text-amber-700 italic mb-10 border-l-4 border-amber-200 pl-8">
                           <EditableText path="home.japanExport.subTitle" content={home.japanExport?.subTitle} />
                        </div>
                        <div className="text-stone-500 font-sans font-light tracking-wide text-lg md:text-xl leading-relaxed mb-16 text-justify">
                           <EditableText path="home.japanExport.description" content={home.japanExport?.description} multiline />
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-stone-200 border border-stone-200 rounded-2xl overflow-hidden mb-16 shadow-xl">
                           <div className="bg-stone-50 p-4 md:p-6 lg:p-8 group hover:bg-white transition-all">
                              <Globe className="text-emerald-700 mb-4 group-hover:scale-110 transition-transform" size={32} />
                              <div className="text-4xl font-display font-bold text-emerald-950 mb-2">Tokyo</div>
                              <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Thị trường xuất khẩu</div>
                           </div>
                           <div className="bg-stone-50 p-4 md:p-6 lg:p-8 group hover:bg-white transition-all">
                              <Award className="text-[#BC002D] mb-4 group-hover:scale-110 transition-transform" size={32} />
                              <div className="text-4xl font-display font-bold text-emerald-950 mb-2">100+</div>
                              <div className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">Chỉ tiêu kiểm định</div>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="flex gap-3">
                              {japanImages.map((_, idx) => (
                                 <button key={idx} onClick={() => changeJapanSlide(idx)} className={`w-3 h-3 rounded-full border-2 transition-all ${idx === japanSlide ? 'bg-[#BC002D] border-[#BC002D] scale-125' : 'bg-transparent border-stone-200'}`} />
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="lg:col-span-7 relative flex justify-center lg:justify-end">
                     <div className="relative z-10 w-full max-w-lg aspect-[3/4.5] bg-white rounded-t-[15rem] rounded-b-3xl border-[12px] border-white shadow-2xl overflow-hidden group">
                        {japanImages.map((img, idx) => (
                           <div key={idx} className={`absolute inset-0 transition-all duration-[1500ms] cubic-bezier(0.22, 1, 0.36, 1) ${idx === japanSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                              <EditableImage path={`home.japanExport.images.${idx}`} src={img} alt="" className="w-full h-full object-cover" />
                           </div>
                        ))}
                        <div className="absolute bottom-12 left-0 w-full text-center z-30">
                           <span className="inline-block px-8 py-2 bg-[#BC002D] text-white text-[12px] font-bold uppercase tracking-[0.3em] shadow-2xl rounded-full">
                              <EditableText path="home.japanExport.badgeText" content={home.japanExport?.badgeText} />
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. Collection Preview */}
         <section ref={el => scrollRefs.current[3] = el} className="reveal-on-scroll relative py-20 md:py-32 lg:py-48 bg-emerald-950 overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(180,83,9,0.1),transparent_70%)]"></div>
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-center">
                  <div className="text-center lg:text-left">
                     <span className="font-script text-7xl text-amber-500 block transform -rotate-2 mb-10 drop-shadow-xl">
                        <EditableText path="home.collection.tagline" content={home.collection.tagline} />
                     </span>
                     {/* FIXED LEADING */}
                     <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] text-white leading-[1.1] mb-12 tracking-tighter pb-4">
                        <EditableText path="home.collection.title" content={home.collection.title} />
                     </h2>
                     <div className="text-xl md:text-2xl font-sans font-light tracking-wide text-emerald-100/50 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-16">
                        <EditableText path="home.collection.description" content={home.collection.description} multiline />
                     </div>
                     <Link to="/products" className="group relative px-16 py-6 overflow-hidden rounded-full bg-amber-700 hover:bg-amber-600 transition-all shadow-[0_0_50px_rgba(180,83,9,0.4)]">
                        <span className="relative z-10 text-white font-bold text-sm uppercase tracking-[0.3em]">
                           <EditableText path="home.collection.buttonText" content={home.collection.buttonText} tag="span" />
                        </span>
                     </Link>
                  </div>
                  <div className="relative flex justify-center">
                     <div className="relative w-full max-w-md aspect-[3/4] group perspective-1000">
                        <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl transform rotate-6 group-hover:rotate-0 transition-transform duration-1000"></div>
                        <div className="absolute inset-2 bg-emerald-900 rounded-2xl overflow-hidden shadow-2xl">
                           <EditableImage path="home.collection.image" src={home.collection.image} alt="Product" className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-[2s]" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 6. Values */}
         <section ref={el => scrollRefs.current[4] = el} className="reveal-on-scroll bg-emerald-900 py-16 md:py-24 lg:py-32 relative overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {home.values.items.map((item, idx) => (
                     <div key={idx} className="group p-6 md:p-8 lg:p-12 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-4">
                        <div className="mb-10 p-5 bg-emerald-950 rounded-full w-fit group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all">{getIcon(item.icon)}</div>
                        <h3 className="font-serif text-3xl text-white mb-6">
                           <EditableText path={`home.values.items.${idx}.title`} content={item.title} />
                        </h3>
                        <div className="text-emerald-100/60 font-sans font-light tracking-wide text-lg leading-relaxed">
                           <EditableText path={`home.values.items.${idx}.desc`} content={item.desc} multiline />
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 7. TESTIMONIALS (Niềm Tin Khách Hàng) */}
         <section ref={el => scrollRefs.current[5] = el} className="reveal-on-scroll py-16 md:py-24 lg:py-32 bg-emerald-950 relative border-t border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">
               <div className="text-center mb-24">
                  <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">
                     <EditableText path="home.headers.testimonialsTagline" content={home.headers?.testimonialsTagline} />
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-[1.2]">
                     <EditableText path="home.headers.testimonialsTitle" content={home.headers?.testimonialsTitle} />
                     <span className="italic font-serif text-amber-600 ml-4">
                        <EditableText path="home.headers.testimonialsSubtitle" content={home.headers?.testimonialsSubtitle} />
                     </span>
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((item, idx) => (
                     <div key={idx} className="bg-emerald-900/50 backdrop-blur-sm p-6 md:p-8 lg:p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/30 transition-all duration-500 group flex flex-col">
                        <div className="mb-8">
                           <Quote className="text-amber-600 fill-amber-600 opacity-50" size={40} />
                        </div>
                        <p className="font-serif text-xl text-emerald-100/80 italic leading-relaxed mb-10 flex-1">
                           "{item.content}"
                        </p>
                        <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                           <div className="w-12 h-12 rounded-full overflow-hidden border border-amber-500/50">
                              <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <h4 className="text-white font-bold text-sm uppercase tracking-wider">{item.name}</h4>
                              <p className="text-emerald-500 text-xs mt-1">{item.role}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 8. [REDESIGNED] BLOG (The Journal) */}
         <section ref={el => scrollRefs.current[6] = el} className="reveal-on-scroll py-16 md:py-28 lg:py-40 bg-[#F5F5F0] text-emerald-950 relative border-t border-emerald-900/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-40 mix-blend-multiply"></div>
            <div className="max-w-[1400px] mx-auto px-6 relative z-10">

               {/* Split Header */}
               <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-emerald-900/10 pb-8 gap-8">
                  <div className="max-w-2xl">
                     <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6 flex items-center gap-3">
                        <div className="w-8 h-px bg-amber-700"></div>
                        <EditableText path="home.headers.blogTagline" content={home.headers?.blogTagline} />
                     </span>
                     {/* FIXED LEADING */}
                     <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-emerald-950 leading-[1.15] pb-2">
                        <EditableText path="home.headers.blogTitle" content={home.headers?.blogTitle} />
                        <span className="font-serif italic text-amber-700 block ml-12">
                           <EditableText path="home.headers.blogSubtitle" content={home.headers?.blogSubtitle} />
                        </span>
                     </h2>
                  </div>
                  <Link to="/story" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-emerald-950 hover:text-amber-700 transition-colors pb-4">
                     Xem tất cả bài viết
                     <div className="w-10 h-10 rounded-full border border-emerald-900/20 flex items-center justify-center group-hover:bg-amber-700 group-hover:border-amber-700 group-hover:text-white transition-all">
                        <ArrowRight size={14} />
                     </div>
                  </Link>
               </div>

               {/* Architectural Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                  {blogPosts.slice(0, 3).map((post, idx) => (
                     <Link to={`/news/${post.slug}`} key={post.id} className="group block">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-t-[10rem] rounded-b-lg mb-8 bg-stone-200 shadow-xl border border-white/50">
                           <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                           />
                           {/* Overlay Gradient on Hover */}
                           <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                           {/* Category Badge */}
                           <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-emerald-950 shadow-lg">
                              {post.category}
                           </div>

                           {/* Hover Icon */}
                           <div className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-950 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                              <ArrowUpRight size={20} />
                           </div>
                        </div>

                        <div className="text-center px-4">
                           <div className="text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex justify-center items-center gap-3">
                              <span className="w-3 h-px bg-amber-700/50"></span>
                              {post.date}
                              <span className="w-3 h-px bg-amber-700/50"></span>
                           </div>
                           <h3 className="font-serif text-2xl md:text-3xl text-emerald-950 leading-tight mb-4 group-hover:text-amber-700 transition-colors duration-300">
                              {post.title}
                           </h3>
                           <p className="text-emerald-900/60 font-sans font-light tracking-wide text-sm leading-relaxed line-clamp-2 max-w-xs mx-auto">
                              {post.excerpt}
                           </p>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </section>

         {/* 9. FAQ */}
         <section ref={el => scrollRefs.current[7] = el} className="reveal-on-scroll py-16 md:py-24 lg:py-32 bg-white border-t border-stone-100">
            <div className="max-w-4xl mx-auto px-6">
               <div className="text-center mb-20">
                  <h2 className="font-display text-5xl text-emerald-950 mb-8">
                     <EditableText path="home.headers.faqTitle" content={home.headers?.faqTitle} />
                  </h2>
                  <div className="text-stone-500 text-xl font-light">
                     <EditableText path="home.headers.faqSubtitle" content={home.headers?.faqSubtitle} />
                  </div>
               </div>
               <div className="space-y-6">
                  {faqs.map((faq, index) => (
                     <div key={index} className="border-b border-stone-100 pb-8 group">
                        <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between py-6 text-left group-hover:text-amber-600 transition-colors">
                           <span className="font-serif text-2xl text-emerald-950">{faq.question}</span>
                           <div className={`transition-transform duration-500 ${openFaqIndex === index ? 'rotate-180 text-amber-600' : 'text-stone-300'}`}><ChevronDown size={28} /></div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${openFaqIndex === index ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                           <p className="text-stone-500 text-lg leading-relaxed font-sans font-light tracking-wide border-l-2 border-amber-200 pl-8">{faq.answer}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default Home;
