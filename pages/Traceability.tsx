import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
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
    <div className="min-h-screen bg-cream-100 py-32 px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <Reveal variant="blur-in">
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-emerald-950 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <ShieldCheck size={36} />
            </div>
            <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Xác Thực</span>
            <h1 className="font-display text-5xl md:text-6xl text-emerald-950 mb-5 tracking-tight">
              {traceabilityPage.header.title}
            </h1>
            <p className="text-stone-400 font-light text-lg max-w-md mx-auto">
              {traceabilityPage.header.subtitle}
            </p>
          </div>
        </Reveal>

        {/* Search */}
        <Reveal variant="fade-up" delay={200}>
          <div className="bg-white rounded-full shadow-[0_8px_40px_-8px_rgba(2,44,34,0.12)] p-2 mb-16 transition-shadow duration-300 focus-within:shadow-[0_8px_40px_-4px_rgba(2,44,34,0.18)]">
            <form onSubmit={onSubmit} className="flex items-center">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập số điện thoại đại lý..."
                className="w-full pl-8 pr-4 py-4 rounded-full border-none focus:ring-0 outline-none font-serif text-lg text-emerald-950 placeholder-stone-300 bg-transparent"
              />
              <button
                type="submit"
                className="shrink-0 w-12 h-12 bg-emerald-950 text-white rounded-full hover:bg-amber-600 transition-colors flex items-center justify-center shadow-md"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        </Reveal>

        {/* Result */}
        {hasSearched && (
          <div className="animate-fade-in-up">
            {result ? (
              <div className="bg-cream-50 border border-cream-300/60 rounded-2xl p-10 md:p-14 shadow-sm relative overflow-hidden">
                {/* Subtle bg mark */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-950/3 rounded-full pointer-events-none" />

                <div className="relative z-10 text-center">
                  {/* Status badge */}
                  <div className="inline-flex items-center gap-2 bg-emerald-950 text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-10 shadow-md">
                    <CheckCircle size={13} />
                    Đại Lý Được Xác Thực
                  </div>

                  {/* Name block */}
                  <div className="mb-10">
                    <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-3">Chứng Nhận Chính Thức</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-2">{result.name}</h2>
                    <p className="font-mono text-emerald-700/70 tracking-widest text-sm">{result.phone}</p>
                  </div>

                  {/* Info row */}
                  <div className="flex items-center justify-center gap-2 text-stone-500 font-light text-sm mb-10">
                    <MapPin size={13} className="text-amber-600 shrink-0" />
                    {result.address}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-cream-300/60 pt-8 flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-[9px] text-stone-400 uppercase tracking-[0.3em] mb-1">Cấp bởi</p>
                      <p className="font-serif text-emerald-950 font-bold">Nam Quốc Tửu</p>
                      <p className="text-[9px] text-stone-400 tracking-wider">OCOP 4 Sao</p>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600/60">
                      <ShieldCheck size={28} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-cream-50 border border-amber-200/60 rounded-2xl p-10 flex items-start gap-6">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-full flex items-center justify-center shrink-0">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-emerald-950 mb-3">Không Tìm Thấy Thông Tin</h3>
                  <p className="text-stone-500 font-light leading-relaxed mb-5">
                    Số điện thoại <span className="font-mono text-emerald-900 bg-cream-200 px-2 py-0.5 rounded text-sm mx-1">{searchTerm}</span> chưa có trong hệ thống đại lý ủy quyền.
                  </p>
                  <p className="text-sm text-stone-400 border-t border-cream-300/50 pt-4">
                    Vui lòng liên hệ hotline để xác minh:{' '}
                    <a href="tel:0966383188" className="text-emerald-800 font-bold hover:text-amber-700 transition-colors">
                      0966 383 188
                    </a>
                  </p>
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
