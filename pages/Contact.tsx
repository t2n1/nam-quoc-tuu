import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import Reveal from '../components/Reveal';

const Contact: React.FC = () => {
  const { siteContent, faqs } = useData();
  const { general, contactPage } = siteContent;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const contactItems = [
    { icon: <MapPin size={18} />, label: contactPage.addressLabel, value: general.address, href: undefined },
    { icon: <Phone size={18} />, label: contactPage.hotlineLabel, value: general.hotline, href: `tel:${general.hotline}` },
    { icon: <Mail size={18} />, label: contactPage.emailLabel, value: general.email, href: `mailto:${general.email}` },
  ];

  return (
    <div className="bg-cream-100 min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Top: Info + Form ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">

          {/* Info column */}
          <Reveal variant="fade-right">
            <div className="space-y-10">
              <div>
                <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">Liên Hệ</span>
                <h1 className="font-serif text-4xl md:text-5xl text-emerald-950 mb-6 leading-tight">{contactPage.title}</h1>
                <p className="text-stone-500 text-lg font-light leading-relaxed">{contactPage.subtitle}</p>
              </div>

              <div className="space-y-3">
                {contactItems.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-5 p-5 rounded-2xl hover:bg-cream-200/50 transition-colors group">
                    <div className="w-11 h-11 bg-emerald-950/8 text-emerald-900 rounded-full flex items-center justify-center shrink-0 group-hover:bg-emerald-950 group-hover:text-amber-400 transition-colors duration-300">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="font-serif text-emerald-950 hover:text-amber-700 transition-colors">{value}</a>
                      ) : (
                        <p className="font-serif text-emerald-950">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="h-56 bg-cream-200 rounded-2xl overflow-hidden relative group border border-cream-300/60">
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 relative z-10">
                  <MapPin size={28} className="text-emerald-900/40 mb-3" />
                  <p className="font-serif italic text-sm text-stone-500 mb-4">Phường Bắc Giang, Bắc Ninh</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(general.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 border border-emerald-950/20 text-emerald-950 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-emerald-950 hover:text-white transition-all"
                  >
                    Mở Google Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form column */}
          <Reveal variant="fade-left" delay={150}>
            <div className="bg-cream-50 border border-cream-300/50 p-8 md:p-12 rounded-2xl shadow-sm">
              <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-2">Đặt Hàng</span>
              <h3 className="font-serif text-3xl text-emerald-950 mb-8">{contactPage.formTitle}</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">{contactPage.formNameLabel}</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 rounded-xl border border-cream-300/80 focus:border-amber-500/50 focus:ring-0 outline-none bg-white/70 font-serif text-emerald-950 placeholder-stone-300 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">{contactPage.formPhoneLabel}</label>
                    <input
                      type="tel"
                      placeholder="090..."
                      className="w-full px-4 py-3 rounded-xl border border-cream-300/80 focus:border-amber-500/50 focus:ring-0 outline-none bg-white/70 font-serif text-emerald-950 placeholder-stone-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">{contactPage.formInterestLabel}</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 rounded-xl border border-cream-300/80 focus:border-amber-500/50 focus:ring-0 outline-none bg-white/70 font-serif text-emerald-950 appearance-none cursor-pointer transition-colors">
                      {contactPage.interestOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={14} />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2">{contactPage.formMessageLabel}</label>
                  <textarea
                    rows={5}
                    placeholder="Tôi muốn tìm hiểu thêm về chính sách đại lý..."
                    className="w-full px-4 py-3 rounded-xl border border-cream-300/80 focus:border-amber-500/50 focus:ring-0 outline-none bg-white/70 font-serif text-emerald-950 placeholder-stone-300 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-950 text-white py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-colors flex items-center justify-center gap-3 shadow-md"
                >
                  <Send size={14} /> {contactPage.submitButton}
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-4xl mx-auto border-t border-cream-300/60 pt-24">
          <Reveal variant="blur-in">
            <div className="text-center mb-16">
              <span className="text-amber-600 font-bold tracking-[0.4em] text-[10px] uppercase block mb-4">FAQ</span>
              <h2 className="font-serif text-4xl md:text-5xl text-emerald-950 mb-4">Câu Hỏi Thường Gặp</h2>
              <p className="text-stone-400 font-light">Những thắc mắc thường gặp khi tìm hiểu về sản phẩm.</p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={index} variant="fade-up" delay={index * 80}>
                <div className={`border rounded-xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-amber-400/50 bg-cream-50' : 'border-cream-300/60 bg-cream-50/50 hover:border-amber-300/40'}`}>
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between px-7 py-5 text-left"
                  >
                    <span className={`font-serif text-lg transition-colors ${openFaqIndex === index ? 'text-amber-700' : 'text-emerald-950'}`}>
                      {faq.question}
                    </span>
                    <div className={`transition-transform duration-300 shrink-0 ml-4 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                      <ChevronDown className={openFaqIndex === index ? 'text-amber-600' : 'text-stone-300'} size={18} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-7 pb-6 pt-1 text-stone-500 leading-relaxed font-light border-t border-cream-300/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
