
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ShieldCheck, Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px]"></div>

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-900 rounded-full mb-4">
              <ShieldCheck size={32} />
           </div>
           <h1 className="font-serif text-3xl font-bold text-emerald-950">Quản Trị Viên</h1>
           <p className="text-stone-500 mt-2 text-sm">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">Mật khẩu bảo mật</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                placeholder="Nhập mật khẩu (admin123)"
              />
              <Lock className="absolute left-3 top-3.5 text-stone-400" size={18} />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-950 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors shadow-lg"
          >
            Đăng Nhập
          </button>
        </form>
        
        <div className="mt-6 text-center">
           <p className="text-xs text-stone-400">Hệ thống quản lý nội dung Bằng Phúc</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
