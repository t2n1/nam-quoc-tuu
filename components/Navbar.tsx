
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { siteContent } = useData();
  const { navbar } = siteContent;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  // Nếu Menu MỞ -> Trong suốt (để lộ nền Overlay bên dưới).
  // Nếu Menu ĐÓNG -> Dựa vào vị trí (đầu trang chủ thì trong suốt, còn lại có nền kem).
  const navBackground = (isOpen || isExpanded) 
    ? 'bg-transparent border-transparent' 
    : 'bg-cream-50/95 backdrop-blur-md border-cream-300/50 shadow-sm';

  const navPadding = isExpanded ? 'py-8' : 'py-4';

  const navLinks = [
    { name: navbar.menuHome, path: '/' },
    { name: navbar.menuStory, path: '/story' },
    { name: navbar.menuProducts, path: '/products' },
    { name: navbar.menuProcess, path: '/process' },
    { name: navbar.menuTraceability, path: '/check' },
  ];

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${navPadding} ${navBackground}`}>
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="group relative z-50 flex items-center gap-3" onClick={() => setIsOpen(false)}>
            {(() => {
              const logoSrc = navbar.logoImage || '/logo-nqt.svg';
              return (
                <>
                  <div
                    aria-label={navbar.logoText}
                    className="h-12 md:h-14 aspect-square flex-shrink-0 transition-all duration-500"
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
    <div className={`fixed inset-0 z-40 bg-cream-100 transform transition-transform duration-[0.8s] ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Background Texture for Menu */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        
        <div className="flex flex-col h-full pt-32 px-10 pb-10 relative">
           
           <div className="flex flex-col space-y-8 flex-1">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-serif text-4xl text-emerald-950 hover:text-amber-700 transition-all duration-500 transform translate-y-4 opacity-0 ${isOpen ? 'animate-fade-in-up' : ''}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
           </div>
           
           <div className="space-y-4">
             <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-sm font-bold uppercase tracking-[0.2em] text-cream-100 bg-emerald-950 py-5 rounded-full shadow-lg"
              >
                {navbar.mobileMenuCta}
              </Link>
              <div className="text-center opacity-60 pt-4">
                <img src={navbar.logoImage || '/logo-nqt.svg'} alt="Logo" className="h-16 w-auto mx-auto object-contain grayscale opacity-50" />
              </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
