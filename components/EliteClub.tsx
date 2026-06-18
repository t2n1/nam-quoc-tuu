
import React, { useState } from 'react';
import { X, Crown, Mail, ArrowRight } from 'lucide-react';

const EliteClub: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl animate-fade-in" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-emerald-900 border border-amber-500/20 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-reveal">
        <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors z-10"><X size={32} /></button>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
           <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden">
              <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000" alt="Club" className="w-full h-full object-cover brightness-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-transparent to-transparent"></div>
           </div>
           <div className="p-12 md:p-16 flex flex-col justify-center">
              <Crown className="text-amber-500 mb-8" size={40} />
              <h2 className="font-display text-4xl text-white mb-6">Nam Quốc Tửu <br/><span className="italic font-serif text-amber-600">Elite Club</span></h2>
              
              {!submitted ? (
                <>
                  <p className="text-emerald-100/50 text-sm leading-relaxed mb-10">
                    Trở thành người đầu tiên thưởng thức những mẻ rượu hạ thổ 10 năm và nhận đặc quyền tham quan xưởng chưng cất di sản.
                  </p>
                  <div className="space-y-4">
                    <div className="relative">
                       <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                       <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="Email của quý khách" 
                         className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white outline-none focus:ring-1 focus:ring-amber-500 transition-all"
                       />
                    </div>
                    <button 
                      onClick={() => setSubmitted(true)}
                      className="w-full py-4 bg-amber-600 text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-amber-500 transition-all flex items-center justify-center gap-3"
                    >
                      Đăng ký đặc quyền <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="animate-fade-in-up">
                   <h3 className="font-serif italic text-2xl text-amber-500 mb-4">Chào mừng quý khách!</h3>
                   <p className="text-emerald-100/40 text-xs">Chúng tôi sẽ gửi thiệp mời gia nhập câu lạc bộ qua email sớm nhất.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default EliteClub;
