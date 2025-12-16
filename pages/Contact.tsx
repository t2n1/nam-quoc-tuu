
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
    <div className="pt-40 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          
          {/* Info Side */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <span className="text-amber-600 font-bold tracking-[0.2em] text-xs uppercase block mb-2">Get in touch</span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-emerald-950 mb-6">{contactPage.title}</h1>
              <p className="text-stone-600 text-lg font-light leading-relaxed">
                {contactPage.subtitle}
              </p>
            </div>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">{contactPage.addressLabel}</h4>
                  <p className="text-stone-600 leading-relaxed">{general.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">{contactPage.hotlineLabel}</h4>
                  <p className="text-stone-600 font-mono text-lg font-bold text-emerald-700">{general.hotline}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">{contactPage.emailLabel}</h4>
                  <p className="text-stone-600">{general.email}</p>
                </div>
              </div>
            </div>

            <div className="h-64 bg-stone-200 rounded-2xl overflow-hidden shadow-inner mt-8 relative group">
               {/* Map Placeholder with effect */}
               <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover opacity-10"></div>
               <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 bg-stone-100 group-hover:bg-stone-200 transition-colors relative z-10">
                  <MapPin size={32} className="text-emerald-800 mb-2 animate-bounce" />
                  <p className="font-serif italic">Bản đồ khu vực xã Bằng Phúc, Bắc Kạn</p>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(general.address)}`} target="_blank" rel="noreferrer" className="mt-4 px-4 py-2 bg-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm hover:shadow-md text-emerald-900">
                    Mở Google Maps
                  </a>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-stone-50 p-8 md:p-10 rounded-3xl shadow-xl border border-stone-100 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-serif text-3xl font-bold text-emerald-900 mb-8">{contactPage.formTitle}</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{contactPage.formNameLabel}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white transition-all" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{contactPage.formPhoneLabel}</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white transition-all" placeholder="090..." />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{contactPage.formInterestLabel}</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white appearance-none cursor-pointer">
                    {contactPage.interestOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">{contactPage.formMessageLabel}</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white transition-all resize-none" placeholder="Tôi muốn tìm hiểu thêm về chính sách đại lý..."></textarea>
              </div>

              <button type="submit" className="w-full bg-emerald-950 text-white font-bold py-4 rounded-lg hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                <Send size={18} /> {contactPage.submitButton}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto border-t border-stone-200 pt-20">
          <div className="text-center mb-16 animate-fade-in-up">
             <div className="inline-block p-4 bg-emerald-50 rounded-full mb-6 text-emerald-800">
               <HelpCircle size={32} />
             </div>
             <h2 className="font-display text-4xl md:text-5xl font-bold text-emerald-950 mb-4">Câu Hỏi Thường Gặp (FAQ)</h2>
             <p className="text-stone-500 text-lg font-light">Những thắc mắc thường gặp khi khách hàng tìm hiểu về sản phẩm.</p>
          </div>

          <div className="space-y-4">
             {faqs.map((faq, index) => (
               <div key={index} className="border border-stone-200 rounded-xl bg-white overflow-hidden hover:border-amber-400 transition-colors duration-300">
                 <button 
                   onClick={() => toggleFaq(index)}
                   className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
                 >
                   <span className={`font-serif text-lg font-bold ${openFaqIndex === index ? 'text-amber-700' : 'text-emerald-950'}`}>
                      {faq.question}
                   </span>
                   <div className={`transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      {openFaqIndex === index ? (
                        <ChevronUp className="text-amber-600" />
                      ) : (
                        <ChevronDown className="text-stone-400" />
                      )}
                   </div>
                 </button>
                 <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                 >
                   <div className="px-6 pb-8 pt-2 text-stone-600 leading-relaxed font-light border-t border-stone-100 border-dashed">
                     {faq.answer}
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
