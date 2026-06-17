import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle, AlertTriangle, ShieldCheck, MapPin, Award } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Distributor } from '../types';
import Reveal from '../components/Reveal';

const Traceability: React.FC = () => {
  const { phone } = useParams<{ phone: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(phone || '');
  const [result, setResult] = useState<Distributor | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { distributors, siteContent } = useData(); 
  const { traceabilityPage } = siteContent;

  useEffect(() => {
    if (phone) {
      setSearchTerm(phone);
      handleSearch(phone);
    }
  }, [phone, distributors]); 

  const handleSearch = (term: string) => {
    setHasSearched(true);
    const found = distributors.find(d => d.phone === term);
    setResult(found || null);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
       navigate(`/check/${searchTerm}`);
       handleSearch(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f1] py-32 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl">
        
        {/* Header */}
        <Reveal variant="blur-in"><div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-950 text-amber-500 rounded-full mb-8 shadow-2xl border-4 border-amber-500/20">
             <ShieldCheck size={40} />
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-emerald-950 mb-6 tracking-tight">{traceabilityPage.header.title}</h1>
          <p className="text-stone-500 font-light text-lg max-w-lg mx-auto">
            {traceabilityPage.header.subtitle}
          </p>
        </div></Reveal>

        {/* Minimalist Search Box */}
        <Reveal variant="fade-up" delay={200}><div className="bg-white rounded-full shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)] p-2 mb-16 transform transition-all duration-300 focus-within:scale-105">
          <form onSubmit={onSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập số điện thoại..."
              className="w-full pl-8 pr-16 py-4 rounded-full border-none focus:ring-0 text-xl font-serif text-emerald-950 placeholder-stone-300 bg-transparent"
            />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-emerald-950 text-white rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center shadow-lg"
            >
              <Search size={20} />
            </button>
          </form>
        </div></Reveal>

        {/* Result Card - Certificate Style */}
        {hasSearched && (
          <div className="animate-reveal">
            {result ? (
              <div className="bg-[#fffdf8] p-10 md:p-16 shadow-2xl rounded-xl border border-stone-200 relative overflow-hidden mx-auto max-w-2xl">
                 {/* Decorative Border */}
                 <div className="absolute inset-3 border-2 border-emerald-900/10 border-dashed rounded-lg pointer-events-none"></div>
                 
                 {/* Watermark */}
                 <div className="absolute -right-20 -bottom-20 text-emerald-900/5 pointer-events-none">
                    <Award size={300} />
                 </div>

                 <div className="relative z-10 text-center">
                    <div className="mb-8">
                       <span className="font-display text-4xl text-emerald-950 block mb-2">Certificate of Authenticity</span>
                       <span className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">Chứng nhận đại lý chính thức</span>
                    </div>
                    
                    <div className="bg-emerald-50/50 p-8 rounded-lg mb-8 border border-emerald-900/5">
                        <h2 className="font-serif text-3xl text-emerald-900 mb-2">{result.name}</h2>
                        <p className="font-mono text-emerald-700 tracking-wider mb-6">{result.phone}</p>
                        
                        <div className="flex items-center justify-center gap-2 text-stone-600 font-light text-sm">
                           <MapPin size={14} className="text-amber-600"/> {result.address}
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-emerald-700 font-bold uppercase tracking-widest text-xs">
                       <CheckCircle size={16} /> Verified Partner
                    </div>
                    
                    <div className="mt-10 pt-6 border-t border-emerald-900/10 flex justify-between items-end">
                       <div className="text-left">
                          <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-1">Cấp bởi</p>
                          <p className="font-serif font-bold text-emerald-900">Nam Quốc Tửu</p>
                       </div>
                       <div className="w-24">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="w-full opacity-40" />
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border-l-4 border-red-500 p-10 flex items-start gap-8 max-w-2xl mx-auto">
                 <div className="text-red-500 shrink-0 p-4 bg-red-50 rounded-full">
                    <AlertTriangle size={32} />
                 </div>
                 <div>
                    <h3 className="font-serif text-2xl font-bold text-red-900 mb-3">Không Tìm Thấy Thông Tin</h3>
                    <p className="text-stone-600 mb-6 font-light leading-relaxed">
                      Số điện thoại <span className="font-bold text-stone-900 font-mono bg-stone-100 px-2 py-0.5 rounded mx-1">{searchTerm}</span> chưa có trong hệ thống dữ liệu đại lý ủy quyền của chúng tôi.
                    </p>
                    <div className="text-sm text-stone-500 border-t border-stone-100 pt-4">
                      Vui lòng kiểm tra lại hoặc liên hệ hotline: <a href="tel:0966383188" className="text-emerald-700 font-bold hover:underline">0966383188</a> để xác minh.
                    </div>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Traceability;