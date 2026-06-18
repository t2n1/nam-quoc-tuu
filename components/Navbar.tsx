
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useData } from '../context/DataContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { siteContent } = useData();
  const { navbar, general } = siteContent;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = (isOpen || scrolled) 
    ? 'bg-emerald-950/95 backdrop-blur-md border-b border-white/5 shadow-2xl py-4' 
    : 'bg-transparent py-8';

  const navLinks = [
    { name: navbar.menuHome, path: '/' },
    { name: navbar.menuStory, path: '/story' },
    { name: navbar.menuProducts, path: '/products' },
    { name: navbar.menuProcess, path: '/process' },
    { name: navbar.menuTraceability, path: '/check', hidden: !general.isTraceabilityEnabled },
  ].filter(link => !link.hidden);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${navBackground}`}>
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            
            {/* LOGO AREA - Added shrink-0 and fixed width constraints to prevent disappearing */}
            <Link to="/" className="group relative z-50 flex-shrink-0 flex items-center gap-2 min-w-[140px]" onClick={() => setIsOpen(false)}>
               <div className="flex flex-col items-start leading-none">
                 <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-amber-50 whitespace-nowrap">
                   {navbar.logoText || 'Nam Quốc Tửu'}<span className="text-amber-500">.</span>
                 </span>
                 <span className="font-script text-xl sm:text-2xl md:text-3xl text-emerald-300 transform -translate-y-2 translate-x-1 block whitespace-nowrap">
                   {navbar.logoSubText || 'est. 18xx'}
                 </span>
               </div>
            </Link>
            
            {/* DESKTOP MENU */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-amber-500 relative group py-2 ${location.pathname === link.path ? 'text-amber-500' : 'text-white/90'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right group-hover:origin-left duration-300 ${location.pathname === link.path ? 'scale-x-100' : ''}`}></span>
                </Link>
              ))}
            </div>

            {/* ICONS & MOBILE TOGGLE */}
            <div className="flex items-center gap-4 md:gap-6">
               <button className="text-white/70 hover:text-amber-500 transition-colors hidden sm:block">
                  <Globe size={20} />
               </button>
               <Link to="/contact" className="hidden sm:inline-block px-6 py-2.5 border border-amber-500/50 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all">
                  {navbar.contactButton}
               </Link>
               <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white hover:text-amber-500 transition-colors z-50 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`fixed inset-0 bg-emerald-950/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
           <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={`font-display text-3xl md:text-4xl lg:text-5xl text-white hover:text-amber-500 transition-colors ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className={`mt-8 px-10 py-4 bg-amber-600 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-500 transition-all ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: '500ms' }}
              >
                  {navbar.mobileMenuCta}
              </Link>
           </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
