import React, { useRef, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { ArrowUpRight, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

interface FeaturedTheme {
  bg: string;
  glowColor: string;
  badgeText: string;
  accentLine: string;
}

const FEATURED_THEMES: FeaturedTheme[] = [
  {
    bg: 'bg-emerald-950',
    glowColor: 'rgba(180,110,0,0.22)',
    badgeText: 'OCOP 4 Sao · Xuất khẩu Nhật Bản',
    accentLine: 'bg-amber-500/30',
  },
  {
    bg: 'bg-[#080808]',
    glowColor: 'rgba(220,170,20,0.18)',
    badgeText: 'ISO 9001:2015 · Men Lá Dược Liệu',
    accentLine: 'bg-amber-400/25',
  },
  {
    bg: 'bg-[#0c1a10]',
    glowColor: 'rgba(160,100,0,0.28)',
    badgeText: 'Nhà hàng · Tiệc cưới · Sự kiện',
    accentLine: 'bg-amber-600/30',
  },
];

const FEATURED_COUNT = 3;

const Products: React.FC = () => {
  const { products, siteContent } = useData();
  const { productsPage, hero: heroData } = siteContent;
  const heroImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroImgRef.current) return;
      heroImgRef.current.style.transform = `scale(1.1) translateY(${window.scrollY * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featured = products.slice(0, FEATURED_COUNT);
  const rest = products.slice(FEATURED_COUNT);

  return (
    <div className="bg-cream-100 min-h-screen overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="h-screen relative overflow-hidden flex items-end pb-28">
        <div ref={heroImgRef} className="absolute inset-0 scale-110 will-change-transform">
          <img
            src={heroData.backgroundImage}
            alt="Bộ Sưu Tập"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-emerald-950/25 to-emerald-950" />
        </div>

        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-white/15" />
          <span className="text-white/30 text-[9px] tracking-[0.5em] uppercase" style={{ writingMode: 'vertical-rl' }}>
            Collection
          </span>
          <div className="w-px h-20 bg-white/15" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 w-full">
          <p
            className="font-script text-amber-400 text-5xl md:text-7xl block animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            {productsPage.header.tagline}
          </p>
          <h1
            className="font-display text-white font-bold leading-none tracking-tighter animate-fade-in-up"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', animationDelay: '0.55s', animationFillMode: 'both' }}
          >
            {productsPage.header.title}
          </h1>
          <div className="flex items-center gap-6 mt-8 animate-fade-in-up" style={{ animationDelay: '0.85s', animationFillMode: 'both' }}>
            <div className="h-px w-16 bg-amber-400/40" />
            <span className="text-white/50 font-serif italic text-sm tracking-widest">{productsPage.header.subtitle}</span>
            <div className="h-px w-20 bg-white/10" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '1.3s', animationFillMode: 'both' }}>
          <span className="text-white/25 text-[8px] tracking-[0.4em] uppercase mb-2">Cuộn xuống</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/10 to-amber-400/50" />
        </div>
      </section>

      {/* ── FEATURED: 3 sản phẩm chụp ảnh riêng ─────────────────────── */}
      {featured.map((product, idx) => {
        const theme = FEATURED_THEMES[idx];
        const isEven = idx % 2 === 0;
        const numLabel = String(idx + 1).padStart(2, '0');

        return (
          <section
            key={product.id}
            className="relative overflow-hidden"
            style={{ minHeight: '100vh' }}
          >
            {/* ── SPLIT BACKGROUND: cream bên ảnh, tối bên text ── */}
            <div className={`absolute inset-0 flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'}`}>
              {/* Phần ảnh: cream sáng */}
              <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-cream-100 relative">
                {/* Vignette góc */}
                <div className="absolute inset-0 bg-gradient-to-b lg:bg-none from-transparent via-transparent to-cream-200/60" />
              </div>
              {/* Phần text: tối */}
              <div className={`w-full lg:w-1/2 h-1/2 lg:h-full ${theme.bg} relative`}>
                {/* Subtle noise */}
                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')]" />
                {/* Giant watermark number */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                  <span
                    className="font-display font-black leading-none text-white/[0.04]"
                    style={{ fontSize: 'clamp(8rem, 25vw, 18rem)' }}
                  >
                    {numLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* ── CONTENT (trên split bg) ── */}
            <div
              className={`relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center min-h-screen`}
            >
              {/* ── ẢNH SẢN PHẨM trên nền cream ── */}
              <div className="w-full lg:w-1/2 flex items-center justify-center relative py-16 lg:py-0 lg:self-stretch">
                {/* Amber glow mềm */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div
                    style={{
                      width: '60%',
                      paddingTop: '60%',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${theme.glowColor} 0%, transparent 70%)`,
                      filter: 'blur(60px)',
                      flexShrink: 0,
                    }}
                  />
                </div>

                {/* PNG — trên nền cream, nền trắng ảnh hoà vào tự nhiên */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="relative z-10 w-auto object-contain animate-float"
                  style={{
                    maxHeight: '70vh',
                    filter: 'drop-shadow(0px 30px 60px rgba(0,0,0,0.18)) drop-shadow(0px 8px 20px rgba(0,0,0,0.12))',
                  }}
                />

                {/* Đường kẻ dọc phân cách ảnh/text trên desktop */}
                <div
                  className={`absolute top-1/4 bottom-1/4 hidden lg:block ${isEven ? 'right-0' : 'left-0'} w-px`}
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.08), transparent)' }}
                />
              </div>

              {/* ── TEXT trên nền tối ── */}
              <Reveal
                variant={isEven ? 'fade-left' : 'fade-right'}
                className={`w-full lg:w-1/2 flex flex-col justify-center pb-20 lg:py-0 ${isEven ? 'lg:pl-12 xl:pl-20' : 'lg:pr-12 xl:pr-20'}`}
              >
                {/* Badge */}
                <span className="inline-flex items-center self-start text-amber-500/70 text-[9px] font-bold tracking-[0.4em] uppercase mb-8 border border-amber-500/20 px-4 py-2 rounded-full">
                  {theme.badgeText}
                </span>

                {/* Số + Tên sản phẩm */}
                <div className="flex items-start gap-5 mb-3">
                  <span className="font-display text-white/10 font-black leading-none shrink-0 hidden sm:block" style={{ fontSize: 'clamp(4rem, 7vw, 6rem)' }}>
                    {numLabel}
                  </span>
                  <h2 className="font-display text-white leading-[0.88]" style={{ fontSize: 'clamp(2.6rem, 4.5vw, 5rem)' }}>
                    {product.name}
                  </h2>
                </div>

                {/* Dung tích */}
                <p className="font-serif text-amber-400 italic text-2xl mb-8">
                  {product.volume}
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-8">
                  <div className={`h-px w-14 ${theme.accentLine}`} />
                  <span className="text-white/20 text-[7px] tracking-[0.5em] uppercase">Nam Quốc Tửu · Tinh Hoa Đại Ngàn</span>
                  <div className="h-px w-8 bg-white/10" />
                </div>

                {/* Mô tả */}
                <p className="text-white/55 text-lg font-light leading-relaxed mb-10 border-l-2 border-amber-500/20 pl-6 max-w-lg">
                  {product.description}
                </p>

                {/* OCOP stars */}
                <div className="flex items-center gap-1.5 mb-10">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={12} className="fill-amber-500 text-amber-500" />
                  ))}
                  <Star size={12} className="text-white/15" />
                  <span className="text-white/25 text-xs ml-2 tracking-wider font-light">OCOP 4 Sao</span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white transition-colors text-[10px] font-bold uppercase tracking-[0.25em] rounded-full shadow-xl"
                  >
                    Xem Chi Tiết
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-white/15 text-white/70 hover:bg-white hover:text-emerald-950 transition-all text-[10px] font-bold uppercase tracking-[0.25em] rounded-full"
                  >
                    Đặt Hàng
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ── CÁC SẢN PHẨM ĐẶC SẢN (grid) ────────────────────────────── */}
      {rest.length > 0 && (
        <section className="bg-cream-100 py-32">
          <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12">
            <Reveal variant="blur-in">
              <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <span className="text-amber-600/60 text-[9px] font-bold tracking-[0.5em] uppercase block mb-4">
                    Khám Phá Thêm
                  </span>
                  <h2 className="font-display text-emerald-950 leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
                    Đặc Sản<br />
                    <span className="font-serif italic text-amber-700">Đại Ngàn</span>
                  </h2>
                </div>
                <p className="text-stone-400 font-light max-w-xs text-lg leading-relaxed">
                  Các dòng rượu ngâm từ thảo dược & trái cây rừng quý hiếm vùng Bắc Kạn.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {rest.map((product, idx) => (
                <Reveal key={product.id} variant="scale-up" delay={idx * 100}>
                  <div className="group rounded-[2rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Dark zone — transparent PNG nổi bật trên nền tối */}
                    <div className="relative bg-emerald-950 overflow-hidden aspect-square">
                      {/* Ambient glow */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                          style={{
                            width: '55%',
                            paddingTop: '55%',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(180,110,0,0.18) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                            flexShrink: 0,
                          }}
                        />
                      </div>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-contain p-10 group-hover:scale-110 transition-transform duration-700 z-10"
                        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.75))' }}
                      />
                      {/* Type badge */}
                      <span className={`absolute top-5 right-5 z-20 text-[8px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm ${product.type === 'Sỉ' ? 'bg-amber-600 text-white' : 'bg-white/10 text-white/60 border border-white/15'}`}>
                        {product.type}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-8">
                      <h3 className="font-display text-2xl text-emerald-950 mb-1 leading-tight">
                        {product.name}
                      </h3>
                      <p className="font-serif text-amber-600 italic text-lg mb-4">{product.volume}</p>
                      <p
                        className="text-stone-500 text-sm font-light leading-relaxed mb-6"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                          overflow: 'hidden',
                        }}
                      >
                        {product.description}
                      </p>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-950 hover:text-amber-600 transition-colors"
                      >
                        Đặt Hàng
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── B2B PARTNERSHIP ───────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pb-32">
        <Reveal variant="scale-up">
          <div className="bg-emerald-950 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10" />
            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="font-script text-5xl text-amber-500/50 block mb-4">
                {productsPage.b2b.tagline}
              </span>
              <h3 className="font-display text-4xl md:text-6xl text-cream-50 mb-8">
                {productsPage.b2b.title}
              </h3>
              <p className="text-emerald-100/60 mb-12 font-light text-xl leading-relaxed">
                {productsPage.b2b.content}
              </p>
              <Link
                to="/contact"
                className="inline-block px-12 py-5 bg-cream-50 text-emerald-950 hover:bg-amber-500 hover:text-white transition-all uppercase tracking-[0.25em] text-xs font-bold rounded-full shadow-lg"
              >
                {productsPage.b2b.buttonText}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
};

export default Products;
