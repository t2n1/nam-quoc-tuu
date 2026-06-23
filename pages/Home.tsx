
import React, { useRef, useCallback, useEffect } from 'react';
import Hero from '../components/Hero';
import {
  ArrowRight, Leaf, Droplets, Award, Hexagon,
  Quote, Wine, Sparkles, Newspaper, Star, Wind,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Reveal from '../components/Reveal';
import VietJapanMap from '../components/VietJapanMap';

const JAPAN_PHOTOS = Array.from({ length: 10 }, (_, i) => `/japan/japan (${i + 1}).webp`);

const MARQUEE_ITEMS = [
  'OCOP 4 SAO', 'BẮC KẠN 1985', 'XUẤT KHẨU NHẬT BẢN', 'ISO 9001:2015',
  'MEN LÁ BÍ TRUYỀN', '32 VỊ THẢO MỌC', 'KHÔNG CHẤT BẢO QUẢN', 'CHỢ ĐỒN · BẮC KẠN',
];

const FEATURED_TRIO = [
  {
    src: '/products/ruou-men-la-500ml.png',
    name: 'Rượu Men Lá',
    volume: '500ml',
    badge: 'Bestseller',
    desc: 'Chai tròn cổ điển — hương men lá rừng Chợ Đồn nguyên bản, tinh khiết.',
  },
  {
    src: '/products/ruou-men-la-5-lit.png',
    name: 'Can 5L · 10L',
    volume: 'Tiệc cưới & Sự kiện',
    badge: 'OCOP 4 Sao',
    desc: 'Phiên bản dung tích lớn cho nhà hàng, tiệc cưới và sự kiện doanh nghiệp.',
  },
  {
    src: '/products/ruou-men-la-500ml-2.png',
    name: 'Rượu Sạch Men Lá',
    volume: '500ml',
    badge: 'Cao Cấp',
    desc: 'Phiên bản tinh chế, vỏ chai dẹt sang trọng — lý tưởng để làm quà biếu.',
  },
];

const Home: React.FC = () => {
  const { siteContent, blogPosts, testimonials, products } = useData();
  const { home, general } = siteContent;
  const [lightbox, setLightbox] = React.useState<string | null>(null);

  const stripRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const dragVelocity = useRef(0); // extra px/frame added by drag

  useEffect(() => {
    const BASE_SPEED = 0.6; // px per frame auto-scroll
    const el = stripRef.current;
    if (!el) return;

    const tick = () => {
      if (el) {
        const speed = BASE_SPEED + dragVelocity.current;
        el.scrollLeft += speed;
        // seamless loop: reset when first copy is done
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
        // decay drag velocity
        dragVelocity.current *= 0.92;
        if (Math.abs(dragVelocity.current) < 0.01) dragVelocity.current = 0;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScroll.current = stripRef.current?.scrollLeft ?? 0;
    if (stripRef.current) stripRef.current.style.cursor = 'grabbing';
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  }, []);

  const onMouseLeave = useCallback(() => {
    isDragging.current = false;
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !stripRef.current) return;
    e.preventDefault();
    const dx = dragStartX.current - e.pageX;
    stripRef.current.scrollLeft = dragStartScroll.current + dx;
    // feed velocity so RAF keeps momentum
    dragVelocity.current = dx * 0.05;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].pageX;
    dragStartScroll.current = stripRef.current?.scrollLeft ?? 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!stripRef.current) return;
    const dx = dragStartX.current - e.touches[0].pageX;
    stripRef.current.scrollLeft = dragStartScroll.current + dx;
    dragVelocity.current = dx * 0.05;
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Leaf': return <Leaf size={36} className="text-amber-400" />;
      case 'Droplets': return <Droplets size={36} className="text-amber-400" />;
      case 'Award': return <Award size={36} className="text-amber-400" />;
      default: return <Sparkles size={36} className="text-amber-400" />;
    }
  };

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="bg-cream-200 overflow-x-hidden">
      <Hero />

      {/* ── Marquee credential strip ── */}
      <div className="bg-amber-700 overflow-hidden py-3 border-y border-amber-600/30">
        <div className="flex animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-8 text-white/90 font-bold text-[10px] tracking-[0.35em] uppercase"
            >
              {item}
              <span className="w-1 h-1 rounded-full bg-white/40 inline-block flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ── Brand intro — split dark / cream ── */}
      <section className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
        {/* Split background */}
        <div className="absolute inset-0 flex flex-col lg:flex-row">
          <div className="w-full h-1/2 lg:h-full lg:w-1/2 bg-emerald-950" />
          <div className="w-full h-1/2 lg:h-full lg:w-1/2 bg-cream-100" />
        </div>
        {/* Subtle noise on dark half */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-1/2 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.03,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto lg:px-12 flex flex-col lg:flex-row items-center min-h-screen py-20">

          {/* Left column: product image on dark bg */}
          <div className="w-full lg:w-1/2 flex items-center justify-center py-16 lg:py-0 px-5 md:px-8 lg:px-0">
            <div className="relative flex items-center justify-center" style={{ height: '72vh' }}>
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 75% at 50% 65%, rgba(180,110,0,0.3) 0%, transparent 70%)',
                }}
              />
              <img
                src="/products/ruou-men-la-500ml.png"
                alt="Rượu Men Lá 500ml"
                className="animate-float relative z-10"
                style={{
                  height: '65vh',
                  width: 'auto',
                  maxWidth: '320px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0px 40px 80px rgba(0,0,0,0.55))',
                }}
              />
            </div>
          </div>

          {/* Right column: text on cream bg */}
          <div className="w-full lg:w-1/2 py-12 lg:py-0 lg:pl-14 xl:pl-20 bg-cream-100 lg:bg-transparent px-5 md:px-8 lg:px-0">
            <Reveal variant="fade-left" delay={100}>
              <div>
                <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">
                  {home.intro.tagline}
                </span>
                <h2 className="font-display text-5xl md:text-8xl text-emerald-950 leading-[0.9] md:leading-[0.85] pt-2 mb-8">
                  {home.intro.title}<br />
                  <span className="font-serif italic text-emerald-800/60 ml-10">
                    {home.intro.subtitle}
                  </span>
                </h2>
                <div className="flex items-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-900/20 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-900/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                    OCOP 4 Sao · 2023
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-700 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-white">
                    ISO 9001:2015
                  </span>
                </div>
                <div className="w-24 h-px bg-amber-600 mb-8" />
                <p className="text-xl font-serif italic text-emerald-900/60 mb-6 leading-relaxed">
                  {home.intro.quote}
                </p>
                <div className="space-y-4 text-stone-600 font-light text-lg leading-relaxed mb-10">
                  <p>{home.intro.body1}</p>
                  <p>{home.intro.body2}</p>
                </div>
                <Link
                  to="/story"
                  className="group inline-flex items-center gap-4 px-10 py-4 border border-emerald-950 text-emerald-950 hover:bg-emerald-950 hover:text-white transition-all duration-500 rounded-full"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Đọc câu chuyện</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3-product spotlight ── */}
      <section className="bg-[#080808] relative overflow-hidden">
        {/* Background watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', opacity: 0.018, letterSpacing: '-0.04em' }}
          >
            MEN LÁ
          </span>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pt-24 pb-8">
          <Reveal variant="blur-in">
            <div className="text-center mb-20">
              <span className="text-amber-500/70 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
                Bộ Sưu Tập
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-white leading-[0.95] md:leading-[0.85] pt-2">
                Ba Phiên Bản,<br />
                <span className="font-serif italic text-amber-500">Một Linh Hồn.</span>
              </h2>
            </div>
          </Reveal>
        </div>

        {/* Three product columns */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {FEATURED_TRIO.map((item, idx) => (
            <Reveal key={idx} variant="fade-up" delay={idx * 100}>
              <div className="group relative flex flex-col items-center text-center px-10 pt-4 pb-16 hover:bg-white/[0.025] transition-all duration-700 overflow-hidden">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 55% at 50% 100%, rgba(180,110,0,0.22) 0%, transparent 70%)',
                  }}
                />
                {/* Badge */}
                <span className="inline-block mb-6 px-4 py-1.5 bg-amber-600/15 border border-amber-600/25 text-amber-500 text-[9px] font-bold uppercase tracking-[0.35em] rounded-full">
                  {item.badge}
                </span>
                {/* Bottle image */}
                <div className="relative flex items-end justify-center" style={{ height: '42vh' }}>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-auto h-full object-contain animate-float"
                    style={{
                      maxWidth: '180px',
                      filter: 'drop-shadow(0 35px 65px rgba(0,0,0,0.85))',
                      animationDelay: `${idx * 2.4}s`,
                    }}
                  />
                </div>
                {/* Text */}
                <div className="mt-10 relative z-10">
                  <h3 className="font-display text-3xl text-white mb-1">{item.name}</h3>
                  <p className="font-serif italic text-amber-400/70 text-sm mb-5">{item.volume}</p>
                  <p className="text-emerald-200/40 font-light text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                    {item.desc}
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-amber-500/60 hover:text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 group-hover:gap-3"
                  >
                    Xem chi tiết <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA below trio */}
        <div className="relative z-10 flex justify-center py-16">
          <Link
            to="/products"
            className="group inline-flex items-center gap-4 px-12 py-4 border border-white/15 text-white/60 hover:bg-amber-700 hover:border-amber-700 hover:text-white transition-all duration-500 rounded-full text-xs font-bold uppercase tracking-[0.25em]"
          >
            Xem Toàn Bộ Sản Phẩm
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />
      </section>

      {/* ── Secondary products scrolling strip ── */}
      <div className="bg-[#080808] py-10 border-b border-white/[0.04]">
        <p className="text-center text-white/18 text-[8px] uppercase tracking-[0.55em] font-bold mb-8">
          Bộ Sưu Tập Đầy Đủ
        </p>
        <div
          ref={stripRef}
          className="flex overflow-x-hidden select-none no-scrollbar"
          style={{
            cursor: 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          {[...products.slice(3), ...products.slice(3)].map((product, i) => (
            <Link
              key={i}
              to={`/products/${product.id}`}
              className="group flex flex-col items-center flex-shrink-0"
              style={{ marginLeft: '2.5rem', marginRight: '2.5rem' }}
              draggable={false}
            >
              <div className="relative flex items-end justify-center" style={{ height: '26vh' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-auto h-full object-contain transition-all duration-700 opacity-40 group-hover:opacity-80"
                  style={{ maxWidth: '100px', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.9))' }}
                  draggable={false}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(180,110,0,0.25) 0%, transparent 70%)' }}
                />
              </div>
              <p className="text-white/25 text-[9px] uppercase tracking-[0.2em] mt-4 group-hover:text-amber-400/60 transition-colors duration-300 text-center max-w-[90px] leading-tight">
                {product.name.replace('Rượu ', '')}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Core Values ── */}
      <section className="bg-emerald-950 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Reveal variant="blur-in">
            <div className="text-center mb-20">
              <span className="font-script text-6xl text-amber-500/20 block mb-2">{home.values.subtitle}</span>
              <h2 className="font-display text-5xl md:text-6xl text-white mb-6">{home.values.title}</h2>
              <p className="text-emerald-100/50 max-w-2xl mx-auto font-light text-lg">{home.values.description}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.values.items.map((item, idx) => (
              <Reveal key={idx} variant="scale-up" delay={idx * 120}>
                <div className="group relative p-10 bg-white/5 border border-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-6 right-8 font-display text-7xl text-white/[0.04] font-bold leading-none select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
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

      {/* ── 32 Vị Thảo Mọc Bí Truyền ── */}
      <section className="bg-emerald-950 py-32 relative overflow-hidden">
        <div
          className="absolute top-0 right-0 font-display text-white/[0.06] leading-none select-none pointer-events-none translate-x-1/3 -translate-y-1/4"
          style={{ fontSize: 'clamp(8rem, 22vw, 22rem)' }}
        >
          32
        </div>
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Reveal variant="blur-in">
            <div className="text-center mb-20">
              <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">
                Linh Hồn Của Rượu
              </span>
              <h2 className="font-display text-5xl md:text-8xl text-white leading-[0.95] md:leading-[0.85] pt-2">
                32 Vị Thảo Mọc<br />
                <span className="font-serif italic text-amber-500">Bí Truyền.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Lá Men Rừng', desc: 'Hương thơm nồng nàn đặc trưng của núi rừng Chợ Đồn.' },
              { name: 'Sâm Cau', desc: 'Tăng cường sức khỏe, tạo hậu vị ngọt sâu.' },
              { name: 'Thảo Quả', desc: 'Gia tăng sự ấm áp và chiều sâu của hương vị.' },
              { name: 'Quế Nhục', desc: 'Hương cay nhẹ, hỗ trợ tuần hoàn máu.' },
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

      {/* ── Vươn Ra Biển Lớn ── */}
      <section className="relative overflow-hidden bg-cream-100 min-h-[560px] flex items-center">
        {/* SVG map — desktop only; on mobile it crops weirdly */}
        <div className="absolute inset-0 z-[5] hidden md:block">
          <VietJapanMap pins={[
            {
              cx: 1192, cy: 270,
              label: 'MAKUHARI MESSE',
              sublabel: 'Makuhari Messe · Chiba',
              photo: JAPAN_PHOTOS[3],
            },
            {
              cx: 1152, cy: 308,
              label: 'TOKYO BIG SIGHT',
              sublabel: 'Tokyo Big Sight · Ariake',
              photo: JAPAN_PHOTOS[6],
            },
          ]} />
        </div>
        {/* Desktop gradient overlays for map */}
        <div className="absolute inset-0 z-[3] hidden md:block bg-gradient-to-r from-cream-100 via-cream-100/85 to-cream-100/10 pointer-events-none" />
        <div className="absolute inset-0 z-[3] hidden md:block bg-gradient-to-b from-cream-100/55 via-transparent to-cream-100/55 pointer-events-none" />

        {/* Mobile-only decorative photo accent */}
        <div className="absolute right-0 top-0 bottom-0 w-2/5 md:hidden z-[2] overflow-hidden">
          <img
            src={JAPAN_PHOTOS[3]}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-cream-100" />
        </div>

        <div className="relative z-10 w-full py-20 md:py-32 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
          <Reveal variant="fade-right">
            <div className="max-w-xl">
              <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-6">
                Tầm Nhìn Toàn Cầu
              </span>
              <h2 className="font-display text-5xl md:text-8xl text-emerald-950 leading-[0.95] md:leading-[0.85] pt-2 mb-4">
                Vươn Ra<br />Biển Lớn
              </h2>
              <p className="font-serif italic text-amber-700 text-xl md:text-2xl mb-8">
                Chinh phục thị trường Nhật Bản
              </p>
              <p className="text-stone-600 font-light leading-relaxed mb-10 text-lg">
                Tự hào là sản phẩm rượu truyền thống đầu tiên của Bắc Kạn chính thức xuất khẩu sang thị trường Nhật Bản — vượt qua hơn 100 chỉ tiêu kiểm định khắt khe về an toàn thực phẩm để khẳng định chất lượng và vị thế quốc tế.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream-50/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-300/40 shadow-sm">
                  <p className="font-display text-4xl text-emerald-950 font-bold mb-1">Tokyo</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Thị Trường Xuất Khẩu</p>
                </div>
                <div className="bg-cream-50/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-300/40 shadow-sm">
                  <p className="font-display text-4xl text-emerald-950 font-bold mb-1">100+</p>
                  <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold">Chỉ Tiêu Kiểm Định</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Japan photo strip ── */}
      <div className="bg-white overflow-hidden py-10 border-y border-cream-200">
        <p className="text-center text-stone-300 text-[8px] uppercase tracking-[0.55em] font-bold mb-7">
          Triển Lãm & Sự Kiện · Nhật Bản
        </p>
        <div className="flex animate-marquee" style={{ width: 'max-content', animationDuration: '65s' }}>
          {[...JAPAN_PHOTOS, ...JAPAN_PHOTOS].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-2 overflow-hidden rounded-xl cursor-zoom-in"
              style={{ width: '260px', height: '175px' }}
              onClick={() => setLightbox(src)}
            >
              <img
                src={src}
                alt={`Triển lãm Nhật Bản ${(i % 10) + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9000] flex items-center justify-center"
          style={{ background: 'radial-gradient(ellipse at center, rgba(2,44,34,0.97) 0%, rgba(1,26,21,0.99) 100%)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Subtle grain overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/az-subtle.png')" }} />
          {/* Amber corner accents */}
          <div className="absolute top-8 left-8 w-8 h-8 border-t border-l border-amber-500/40 pointer-events-none" />
          <div className="absolute top-8 right-8 w-8 h-8 border-t border-r border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-b border-l border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-b border-r border-amber-500/40 pointer-events-none" />

          <img
            src={lightbox}
            alt="Triển lãm"
            className="max-w-[88vw] max-h-[82vh] object-contain rounded-xl shadow-2xl"
            style={{
              animation: 'fadeInUp 0.25s ease-out both',
              border: '1px solid rgba(245,158,11,0.15)',
              boxShadow: '0 0 80px rgba(180,83,9,0.18)',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-amber-400/60 hover:text-amber-300 text-3xl leading-none transition-colors font-light"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* ── Testimonials ── */}
      <section className="py-24 bg-cream-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Reveal variant="blur-in">
            <div className="text-center mb-16">
              <span className="text-amber-700 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">
                Testimonials
              </span>
              <h2 className="font-display text-5xl text-emerald-950">Niềm Tin Khách Hàng</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <Reveal key={idx} variant="scale-up" delay={idx * 120}>
                <div className="bg-cream-50 p-10 rounded-xl shadow-sm border border-cream-300/40 relative group hover:shadow-md transition-all duration-500 hover:-translate-y-2">
                  <Quote className="text-amber-500/20 w-16 h-16 absolute top-6 right-6 rotate-180" />
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-600 font-serif italic text-lg leading-relaxed mb-8 relative z-10">
                    "{item.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-300/60">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
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

      {/* ── Traceability CTA ── */}
      <section className="py-32 bg-cream-100 relative overflow-hidden">
        <div
          className="absolute -left-20 top-1/2 -translate-y-1/2 font-display text-emerald-900/5 leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(8rem, 18vw, 20rem)' }}
        >
          {home.traceabilityBanner.bgText}
        </div>
        <Reveal variant="blur-in">
          <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-12 text-center relative z-10">
            <Quote className="text-amber-600/50 w-12 h-12 mx-auto mb-8 rotate-180" />
            <h2 className="font-display text-4xl md:text-6xl text-emerald-950 mb-10 leading-tight">
              {home.traceabilityBanner.quote}
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {general.isTraceabilityEnabled && (
                <Link
                  to="/check"
                  className="px-10 py-4 bg-emerald-950 text-white rounded-full hover:bg-amber-700 transition-colors duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3 shadow-xl hover:shadow-2xl"
                >
                  <Hexagon size={16} /> {home.traceabilityBanner.title}
                </Link>
              )}
              <Link
                to="/process"
                className="px-10 py-4 border border-emerald-950/30 text-emerald-950 rounded-full hover:bg-emerald-950 hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest flex items-center gap-3"
              >
                <Wine size={16} /> Quy Trình Tạo Tác
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
