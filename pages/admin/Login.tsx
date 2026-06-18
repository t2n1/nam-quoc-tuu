
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ShieldCheck, Lock, ArrowRight, Sparkles } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Fake loading for effect
    setTimeout(() => {
        if (login(password)) {
            navigate('/admin/dashboard');
        } else {
            setError('Mật mã không chính xác.');
            setIsLoading(false);
        }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#022c22] flex items-center justify-center px-4 relative overflow-hidden font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
         <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-emerald-800/20 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Card Container */}
        <div className="bg-emerald-950/50 backdrop-blur-xl border border-white/10 p-1 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <div className="bg-[#03382d]/80 rounded-[1.8rem] p-8 md:p-10 relative overflow-hidden">
                {/* Decor */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                
                <div className="text-center mb-10">
                   <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-b from-emerald-800 to-emerald-950 rounded-2xl mb-6 border border-white/5 shadow-inner group">
                      <Sparkles size={32} className="text-amber-400 group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <h1 className="font-display text-4xl text-white mb-2 tracking-tight">Quản Trị Viên</h1>
                   <p className="text-emerald-200/40 text-xs font-medium uppercase tracking-[0.2em]">Nam Quốc Tửu Heritage</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-emerald-400/70 uppercase tracking-wider ml-1">Mật mã truy cập</label>
                    <div className="relative group">
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        className="w-full pl-12 pr-4 py-4 bg-emerald-950/50 border border-emerald-800/50 rounded-xl focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 outline-none transition-all text-white placeholder-emerald-800 text-sm font-medium tracking-widest"
                        placeholder="••••••••"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700 group-focus-within:text-amber-500 transition-colors">
                         <Lock size={18} />
                      </div>
                    </div>
                    {error && <div className="text-red-400 text-xs flex items-center gap-1 ml-1 animate-pulse"><div className="w-1 h-1 rounded-full bg-red-400"></div> {error}</div>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white py-4 rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            <span className="font-bold text-xs uppercase tracking-widest">Đăng Nhập</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                    {/* Shine Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10"></div>
                  </button>
                </form>
            </div>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-[10px] text-emerald-800 font-medium">
             &copy; {new Date().getFullYear()} HTX Rượu Nam Quốc Tửu
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
