
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { siteContent } = useData();
  const { navbar, general } = siteContent;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Xác định trạng thái hiển thị
  const isHome = location.pathname === '/';

  // isExpanded: Trạng thái ở đầu trang chủ (Padding lớn, nền trong suốt mặc định)
  const isExpanded = isHome && !scrolled;

  // Logic màu chữ:
  // Nếu Menu MỞ -> Luôn dùng màu tối (Emerald-950) để tương phản với nền menu kem.
  // Nếu Menu ĐÓNG -> Dựa vào vị trí (đầu trang chủ thì trắng, còn lại tối).
  const textColor = (isOpen || !isExpanded) ? 'text-emerald-950' : 'text-cream-50';
  const subTextColor = (isOpen || !isExpanded) ? 'text-emerald-900/60' : 'text-white/60';
  const hoverColor = (isOpen || !isExpanded) ? 'hover:text-amber-600' : 'hover:text-amber-300';
  const lineColor = (isOpen || !isExpanded) ? 'bg-amber-600' : 'bg-amber-300';

  // Logic nền Navbar:
  // Nếu Menu MỞ -> Nền kem đặc ngay lập tức (không transition) để che hero khi overlay đang slide vào.
  // Nếu Menu ĐÓNG -> Dựa vào vị trí (đầu trang chủ thì trong suốt, còn lại có nền kem).
  const navBackground = isOpen
    ? 'bg-cream-100 border-cream-300/50'
    : isExpanded
      ? 'bg-transparent border-transparent'
      : 'bg-cream-50/95 backdrop-blur-md border-cream-300/50 shadow-sm';

  const navPaddingBottom = isExpanded ? 'pb-8' : 'pb-4';
  const navPaddingTop = `max(env(safe-area-inset-top, 0px), ${isExpanded ? '2rem' : '1rem'})`;

  const navLinks = [
    { name: navbar.menuHome, path: '/' },
    { name: navbar.menuStory, path: '/story' },
    { name: navbar.menuProducts, path: '/products' },
    { name: navbar.menuProcess, path: '/process' },
    ...(general.isTraceabilityEnabled ? [{ name: navbar.menuTraceability, path: '/check' }] : []),
    { name: navbar.contactButton, path: '/contact' },
  ];

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] ${isOpen ? '' : 'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'} ${navPaddingBottom} ${navBackground}`}
      style={{ paddingTop: navPaddingTop }}
    >
      <div className="max-w-[1500px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="group relative z-50 flex items-center gap-3" onClick={() => setIsOpen(false)}>
            {(() => {
              const logoSrc = navbar.logoImage || '/logo-nqt.svg';
              return (
                <>
                  <div className="relative flex-shrink-0">
                    <div
                      aria-label={navbar.logoText}
                      className="h-12 md:h-14 aspect-square transition-all duration-500"
                      style={{
                        backgroundColor: (isOpen || !isExpanded) ? '#022c22' : '#fcfbf9',
                        maskImage: `url(${logoSrc})`,
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskImage: `url(${logoSrc})`,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: 'center',
                      }}
                    />
                    <span className={`absolute top-0 right-0.5 text-[11px] font-bold leading-none transition-colors duration-500 ${(isOpen || !isExpanded) ? 'text-emerald-900/50' : 'text-white/50'}`}>®</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className={`font-serif text-lg md:text-xl font-bold tracking-tight transition-colors duration-500 ${textColor}`}>
                      {navbar.logoText}
                    </span>
                    <span className={`font-sans text-[9px] tracking-[0.25em] uppercase transition-colors duration-500 ${subTextColor}`}>
                      {navbar.logoSubText}
                    </span>
                  </div>
                </>
              );
            })()}
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              // Desktop active state color logic
              const activeClass = isActive 
                ? (isExpanded ? 'text-amber-300' : 'text-emerald-900') 
                : textColor;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-bold tracking-[0.25em] uppercase transition-all duration-300 relative py-2 group ${activeClass} ${hoverColor}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right group-hover:origin-left ${lineColor}`}></span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center">
            <Link 
              to="/contact" 
              className={`px-8 py-3 border transition-all duration-500 ease-out rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105
                ${(isExpanded && !isOpen)
                  ? 'border-white/30 text-white hover:bg-white hover:text-emerald-950' 
                  : 'border-emerald-950 text-emerald-950 hover:bg-emerald-950 hover:text-white'
                }`}
            >
              {navbar.contactButton}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors md:hidden relative z-50 ${textColor}`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile Menu Overlay — outside <nav> to avoid containing-block clipping */}
    <div className={`fixed inset-0 z-[90] bg-cream-100 transform transition-transform duration-[0.8s] ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Background Texture for Menu */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        
        <div
          className="flex flex-col justify-between h-full px-8 relative"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5rem)', paddingBottom: '2.5rem' }}
        >
          {/* Nav items with dividers */}
          <div className="flex flex-col">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center justify-between py-4 border-b border-emerald-950/10 transform translate-y-4 opacity-0 ${isOpen ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <span className="font-serif text-[2rem] leading-tight text-emerald-950 group-hover:text-amber-700 transition-colors duration-300">
                  {link.name}
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-950/25 group-hover:text-amber-600/50 transition-colors duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom section */}
          <div className="space-y-4 pt-4">
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-emerald-900/40">
              {navbar.logoSubText}
            </p>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-xs font-bold uppercase tracking-[0.25em] text-white bg-emerald-950 py-4 rounded-full hover:bg-amber-700 transition-colors duration-300 shadow-lg"
            >
              {navbar.mobileMenuCta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
