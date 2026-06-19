
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Search, ShieldCheck, MapPin, Award, Share2, Printer, ChevronRight, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Distributor } from '../types';
import SEOMetadata from '../components/SEOMetadata';

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
      const found = distributors.find(d => d.phone === phone);
      setResult(found || null);
      setHasSearched(true);
      // Auto scroll to result on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        setHasSearched(false);
        setResult(null);
    }
  }, [phone, distributors]); 

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
       const cleanSearch = searchTerm.trim().replace(/\s/g, '');
       navigate(`/check/${cleanSearch}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-emerald-950">
      <SEOMetadata 
        title={result ? `Xác thực: Đại lý ${result.name} - ${result.phone}` : traceabilityPage.header.title} 
        description={result ? `Chứng nhận đại lý ủy quyền chính hãng OCOP 4 sao cho ${result.name} tại ${result.address}. Tra cứu ngay!` : traceabilityPage.header.subtitle} 
        phoneCheck={phone}
        image="https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=1000&auto=format&fit=crop"
      />
      
      {/* Dynamic Header */}
      <section className={`relative overflow-hidden transition-all duration-700 ${result ? 'pt-32 pb-20 bg-emerald-950 text-white' : 'pt-32 pb-20 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 bg-emerald-950 text-white'}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          {!result && (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-900 rounded-full mb-8 shadow-2xl border border-white/5 animate-fade-in-up">
               <ShieldCheck size={40} className="text-amber-500" />
            </div>
          )}
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-[10rem] text-cream-50 mb-8 leading-none drop-shadow-2xl">
            {result ? 'Chứng Nhận Ủy Quyền' : 'Xác Thực Nguồn Gốc'}
          </h1>
          <p className="text-emerald-100/60 font-light text-lg md:text-xl max-w-xl mx-auto italic">
             {result ? `Verified Distributor Certificate` : traceabilityPage.header.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 relative z-20 -mt-16">
        <div className="max-w-6xl mx-auto">
           
           {/* === DIGITAL CERTIFICATE VIEW (When found) === */}
           {hasSearched && result ? (
             <div className="animate-fade-in-up">
                {/* Search Bar Condensed */}
                <div className="max-w-md mx-auto mb-12">
                   <form onSubmit={onSubmit} className="relative flex items-center bg-white rounded-full p-2 border border-stone-200 shadow-xl">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Tra cứu số khác..."
                        className="flex-1 px-6 py-2 rounded-full outline-none font-sans font-light text-emerald-950 placeholder-stone-300 bg-transparent"
                      />
                      <button type="submit" className="bg-emerald-950 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"><Search size={18} /></button>
                   </form>
                </div>

                {/* The Certificate Card */}
                <div className="bg-[#fcfbf9] relative p-4 sm:p-6 md:p-10 lg:p-16 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-w-4xl mx-auto border-[8px] md:border-[12px] lg:border-[16px] border-double border-emerald-900 overflow-hidden">
                   {/* Decorative Corners */}
                   <div className="absolute top-0 left-0 w-12 h-12 m-2 md:w-16 md:h-16 md:m-3 lg:w-24 lg:h-24 lg:m-4 border-t-2 border-l-2 border-amber-600"></div>
                   <div className="absolute top-0 right-0 w-12 h-12 m-2 md:w-16 md:h-16 md:m-3 lg:w-24 lg:h-24 lg:m-4 border-t-2 border-r-2 border-amber-600"></div>
                   <div className="absolute bottom-0 left-0 w-12 h-12 m-2 md:w-16 md:h-16 md:m-3 lg:w-24 lg:h-24 lg:m-4 border-b-2 border-l-2 border-amber-600"></div>
                   <div className="absolute bottom-0 right-0 w-12 h-12 m-2 md:w-16 md:h-16 md:m-3 lg:w-24 lg:h-24 lg:m-4 border-b-2 border-r-2 border-amber-600"></div>
                   
                   {/* Background Pattern */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

                   <div className="relative z-10 text-center">
                      {/* Logo */}
                      <div className="mb-8">
                         <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-emerald-950 block">Rượu Nam Quốc Tửu</span>
                         <span className="font-script text-xl md:text-2xl text-amber-600">Tinh hoa đại ngàn</span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-emerald-950 mb-4 uppercase tracking-widest">Giấy Chứng Nhận</h2>
                      <p className="text-stone-500 font-serif italic text-sm md:text-lg mb-8 md:mb-12">Đại lý phân phối chính thức sản phẩm OCOP 4 sao</p>

                      <div className="max-w-2xl mx-auto border-t border-b border-stone-200 py-6 md:py-10 mb-8 md:mb-12">
                         <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] mb-4">Chứng nhận cấp cho:</p>
                         <h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-amber-700 mb-6">{result.name}</h3>
                         <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-emerald-900 font-medium text-sm md:text-base">
                            <div className="flex items-center gap-2"><MapPin size={18} className="text-amber-600" /> {result.address}</div>
                            <div className="hidden md:block text-stone-300">|</div>
                            <div className="flex items-center gap-2 font-mono"><Award size={18} className="text-amber-600" /> ID: {result.phone}</div>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end text-left px-4 md:px-12">
                         <div className="flex flex-col gap-2">
                             <div className="text-[10px] uppercase tracking-widest text-stone-400">Ngày cấp</div>
                             <div className="font-mono text-emerald-950">01/01/2024</div>
                             <div className="text-[10px] uppercase tracking-widest text-stone-400 mt-4">Hiệu lực</div>
                             <div className="font-mono text-emerald-950">Không thời hạn</div>
                         </div>
                         <div className="flex flex-col items-center">
                             <div className="w-32 h-32 relative mb-2">
                                {/* Stamp Animation */}
                                <div className="absolute inset-0 border-4 border-red-700 rounded-full opacity-20 animate-ping"></div>
                                <div className="absolute inset-0 border-4 border-red-700 rounded-full flex items-center justify-center rotate-[-15deg]">
                                   <div className="text-center">
                                      <div className="text-red-700 font-bold uppercase text-[10px] tracking-widest">Verified</div>
                                      <div className="text-red-700 font-display text-xl font-bold">OCOP 4★</div>
                                      <div className="text-red-700 text-[8px] uppercase">Original</div>
                                   </div>
                                </div>
                             </div>
                             <div className="font-script text-3xl text-emerald-950">Nong Van Tam</div>
                             <div className="h-px w-32 bg-stone-300 my-1"></div>
                             <div className="text-[10px] uppercase tracking-widest text-stone-400">Giám đốc</div>
                         </div>
                      </div>

                      <div className="mt-12 flex justify-center gap-4 print:hidden">
                         <button onClick={() => window.print()} className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-emerald-950 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-stone-200 transition-colors">
                            <Printer size={16} /> In chứng nhận
                         </button>
                         <button className="flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-500 transition-colors shadow-lg">
                            <Share2 size={16} /> Chia sẻ
                         </button>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="max-w-3xl mx-auto">
               {/* Default Search Card */}
               <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl md:rounded-[2rem] lg:rounded-[3rem] shadow-2xl border border-stone-100 flex flex-col justify-between">
                  <div className="text-center">
                    <h3 className="font-serif text-2xl md:text-3xl mb-4 text-emerald-950">Tra cứu Đại lý</h3>
                    <p className="text-stone-400 text-sm mb-8 md:mb-10">Nhập số điện thoại để kiểm tra chứng nhận OCOP chính hãng.</p>
                    <form onSubmit={onSubmit} className="relative flex items-center bg-stone-50 rounded-full p-2 border border-stone-100 focus-within:border-amber-500 transition-all">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ví dụ: 09012345678"
                        className="flex-1 px-6 py-4 rounded-full outline-none text-xl font-sans font-light text-emerald-950 placeholder-stone-300 bg-transparent text-center md:text-left"
                      />
                      <button type="submit" className="bg-emerald-950 hover:bg-amber-600 text-white w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-lg absolute right-2"><Search size={24} /></button>
                    </form>
                  </div>
                  
                  {hasSearched && !result && (
                     <div className="mt-12 p-8 bg-red-50 rounded-3xl border border-red-100 animate-reveal text-center">
                        <div className="flex items-center justify-center gap-4 mb-4">
                           <AlertTriangle className="text-red-500" size={24} />
                           <h4 className="font-bold text-red-950 text-xl">Chưa xác thực</h4>
                        </div>
                        <p className="text-red-800 text-sm">Số điện thoại <strong>{phone}</strong> không nằm trong hệ thống phân phối chính thức.</p>
                     </div>
                  )}
               </div>
             </div>
           )}

           {/* === SEO DIRECTORY LINKS (Always visible, especially for bots) === */}
           <div className="mt-24 pt-12 border-t border-stone-200">
              <h3 className="font-serif text-2xl text-emerald-950 mb-8">Danh sách đại lý ủy quyền nổi bật</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {distributors.map((d) => (
                    <Link 
                       key={d.phone} 
                       to={`/check/${d.phone}`} 
                       className="group p-4 bg-white rounded-xl border border-stone-100 hover:border-amber-500 hover:shadow-lg transition-all"
                    >
                       <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">{d.phone}</span>
                          <ChevronRight size={14} className="text-stone-300 group-hover:text-amber-500" />
                       </div>
                       <h4 className="font-bold text-emerald-950 text-sm truncate">{d.name}</h4>
                       <p className="text-xs text-stone-500 truncate mt-1">{d.address}</p>
                    </Link>
                 ))}
              </div>
              <p className="text-xs text-stone-400 mt-6 italic">* Danh sách được cập nhật liên tục. Vui lòng nhập số điện thoại để tra cứu chính xác nhất.</p>
           </div>

        </div>
      </section>
    </div>
  );
};

export default Traceability;
