
import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const { siteContent, faqs } = useData();
  const { general, contactPage } = siteContent;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-cream-50 min-h-screen text-emerald-950">
      
      {/* 1. CINEMATIC HEADER (DARK) */}
      <section className="bg-emerald-950 pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-48 lg:pb-32 px-5 md:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <span className="font-sans text-[10px] font-bold tracking-[0.4em] uppercase text-amber-500 mb-6 md:mb-8 block">Get in Touch</span>
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] text-white leading-[0.95] md:leading-[0.8] pt-2 tracking-tighter mb-8 md:mb-10 drop-shadow-2xl pb-4">{contactPage.title}</h1>
          <div className="w-16 md:w-24 h-px bg-amber-500 mx-auto mb-8 md:mb-10 opacity-30"></div>
          <p className="font-serif italic text-xl md:text-2xl text-emerald-100/60 font-light max-w-3xl mx-auto leading-relaxed px-4">{contactPage.subtitle}</p>
        </div>
      </section>

      {/* 2. CONTACT CONTENT (LIGHT) */}
      <section className="py-20 md:py-32 px-5 md:px-8 lg:px-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12 border-t border-stone-100 pt-12">
              <div>
                 <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Văn phòng sản xuất</h4>
                 <p className="text-emerald-950 text-xl font-sans font-light leading-snug">{general.address}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Hotline trực tiếp</h4>
                    <p className="text-amber-700 text-4xl font-display font-bold tracking-tight">{general.hotline}</p>
                 </div>
                 <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-4">Email tư vấn</h4>
                    <p className="text-emerald-950 text-lg font-sans font-light border-b border-emerald-50 pb-2">{general.email}</p>
                 </div>
              </div>
            </div>
            <div className="aspect-video w-full bg-stone-50 rounded-3xl flex items-center justify-center border border-stone-100 text-stone-300 text-[10px] font-bold uppercase tracking-[0.4em] shadow-inner">
               Interactive Map Loading...
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
             <div className="bg-cream-50 p-6 sm:p-10 md:p-12 lg:p-20 rounded-3xl md:rounded-[3rem] lg:rounded-[4rem] shadow-2xl border border-emerald-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-amber-500/5 rounded-full blur-[60px] md:blur-[80px]"></div>
                <h3 className="font-display text-4xl sm:text-5xl text-emerald-950 mb-8 md:mb-12 relative z-10">Gửi lời nhắn <br/><span className="italic text-amber-600 font-serif">đến chúng tôi</span></h3>
                <form className="space-y-8 md:space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">{contactPage.formNameLabel}</label>
                      <input type="text" className="w-full px-0 py-4 border-b-2 border-stone-200 focus:border-amber-500 outline-none bg-transparent transition-all placeholder-stone-300 text-emerald-950 text-lg font-sans font-light" placeholder="Nguyễn Văn A" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">{contactPage.formPhoneLabel}</label>
                      <input type="tel" className="w-full px-0 py-4 border-b-2 border-stone-200 focus:border-amber-500 outline-none bg-transparent transition-all placeholder-stone-300 text-emerald-950 text-lg font-sans font-light" placeholder="09xx..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">{contactPage.formInterestLabel}</label>
                    <div className="relative">
                      <select className="w-full px-0 py-4 border-b-2 border-stone-200 focus:border-amber-500 outline-none bg-transparent appearance-none cursor-pointer text-emerald-950 text-lg font-sans font-light">
                        {contactPage.interestOptions.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-300 pointer-events-none" size={20} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">{contactPage.formMessageLabel}</label>
                    <textarea rows={4} className="w-full px-0 py-4 border-b-2 border-stone-200 focus:border-amber-500 outline-none bg-transparent transition-all resize-none placeholder-stone-300 text-emerald-950 text-lg font-sans font-light" placeholder="Bạn cần chúng tôi hỗ trợ điều gì?"></textarea>
                  </div>
                  <button type="submit" className="w-full md:w-auto px-16 py-6 bg-emerald-950 text-white rounded-full font-bold text-[11px] uppercase tracking-[0.3em] hover:bg-amber-600 transition-all flex items-center justify-center gap-4 shadow-2xl hover:scale-105 active:scale-95">
                    {contactPage.submitButton} <Send size={18} />
                  </button>
                </form>
             </div>
          </div>

        </div>

        {/* FAQ SECTION (LIGHT) */}
        <div className="max-w-4xl mx-auto mt-24 md:mt-32 lg:mt-48 border-t border-stone-100 pt-16 md:pt-24">
           <div className="text-center mb-12 md:mb-20">
              <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4 md:mb-6">Common Questions</span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-emerald-950">Giải đáp thắc mắc</h2>
           </div>
           <div className="space-y-6 md:space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-stone-100 pb-6 md:pb-8 group">
                  <button onClick={() => toggleFaq(index)} className="w-full flex items-center justify-between py-4 md:py-6 text-left group-hover:text-amber-600 transition-colors">
                    <span className="font-serif text-2xl md:text-3xl text-emerald-950 group-hover:text-amber-700">{faq.question}</span>
                    <div className={`transition-transform duration-500 ${openFaqIndex === index ? 'rotate-180 text-amber-600' : 'text-stone-300'}`}><ChevronDown size={32} /></div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${openFaqIndex === index ? 'max-h-96 opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                    <p className="text-stone-500 text-lg leading-relaxed font-sans font-light border-l-4 border-amber-200 pl-10">{faq.answer}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
