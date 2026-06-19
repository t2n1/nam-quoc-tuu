
import React from 'react';
import { Phone, MapPin, Mail, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Footer: React.FC = () => {
  const { siteContent } = useData();
  const { general, footer } = siteContent;

  return (
    <footer className="bg-emerald-950 text-cream-200 border-t-4 border-amber-750 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-3xl text-white">{footer.brand.titleLine1} <br/> <span className="italic text-amber-500">{footer.brand.titleHighlight}</span></h3>
            <p className="text-sm leading-relaxed text-emerald-100/60 font-light max-w-sm">
              {footer.brand.description}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={general.facebook} className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 hover:text-white transition-all"><Facebook size={18} /></a>
              <a href={`mailto:${general.email}`} className="w-10 h-10 border border-emerald-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:border-amber-600 hover:text-white transition-all"><Mail size={18} /></a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-amber-100 font-bold uppercase tracking-widest text-xs">{footer.sections.linksTitle}</h4>
            <ul className="space-y-3 text-sm font-light">
              <li><Link to="/" className="hover:text-amber-400 hover:pl-2 transition-all">Trang Chủ</Link></li>
              <li><Link to="/story" className="hover:text-amber-400 hover:pl-2 transition-all">Câu Chuyện & Di Sản</Link></li>
              <li><Link to="/products" className="hover:text-amber-400 hover:pl-2 transition-all">Bộ Sưu Tập</Link></li>
              <li><Link to="/check" className="hover:text-amber-400 hover:pl-2 transition-all">Tra Cứu Nguồn Gốc</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-amber-100 font-bold uppercase tracking-widest text-xs">{footer.sections.contactTitle}</h4>
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-start gap-4">
                <MapPin className="shrink-0 text-amber-600 mt-1" size={16} />
                <span>{general.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="shrink-0 text-amber-600" size={16} />
                <a href={`tel:${general.hotline}`} className="font-mono text-lg tracking-wider hover:text-amber-400 transition-colors">{general.hotline}</a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="shrink-0 text-amber-600" size={16} />
                <a href={`mailto:${general.email}`} className="hover:text-amber-400 transition-colors">{general.email}</a>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-emerald-900 mt-10 pt-6 md:mt-16 md:pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-emerald-100/40 font-light gap-4">
          <p>© {new Date().getFullYear()} {footer.bottom.copyright}</p>
          <div className="flex items-center gap-6">
            <p className="italic">{footer.bottom.disclaimer}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
