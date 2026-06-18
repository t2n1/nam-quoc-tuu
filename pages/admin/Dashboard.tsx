
import React from 'react';
import { useData } from '../../context/DataContext';
import { Package, Users, Eye, TrendingUp, ArrowUpRight, Calendar, Activity, Wine, ChevronRight, Plus, MoreHorizontal, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { products, distributors } = useData();

  const stats = [
    { title: 'Sản Phẩm Active', value: products.length, unit: 'SKU', icon: <Package size={20} />, trend: '+2', color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { title: 'Đại Lý Phân Phối', value: distributors.length, unit: 'Stores', icon: <Users size={20} />, trend: '+12%', color: 'text-blue-700', bg: 'bg-blue-50' },
    { title: 'Lượt Truy Cập', value: '12.5k', unit: 'Views', icon: <Eye size={20} />, trend: '+24%', color: 'text-amber-700', bg: 'bg-amber-50' },
    { title: 'Doanh Số Ước Tính', value: '150', unit: 'Triệu', icon: <TrendingUp size={20} />, trend: '+8%', color: 'text-purple-700', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* 1. Hero Welcome Card - Glassmorphism */}
      <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
         <div className="absolute inset-0 bg-gradient-to-r from-[#022c22] to-[#044c3b]"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
         
         <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-amber-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                  <Wine size={12} /> System Status: Excellent
               </div>
               <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
                  Chào mừng trở lại, <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Administrator.</span>
               </h1>
               <p className="text-emerald-100/60 font-light max-w-md text-sm leading-relaxed">
                  Hệ thống đang hoạt động ổn định. Có 3 đơn đăng ký đại lý mới đang chờ duyệt trong hôm nay.
               </p>
            </div>
            
            <div className="flex gap-4">
                <Link to="/admin/products" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2">
                   Quản lý kho
                </Link>
                <Link to="/admin/blog" className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-1">
                   <Plus size={16} /> Viết bài mới
                </Link>
            </div>
         </div>
      </div>

      {/* 2. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[1.5rem] border border-stone-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group">
             <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                   {stat.icon}
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                   <ArrowUpRight size={10} /> {stat.trend}
                </div>
             </div>
             <div>
                <h3 className="text-3xl font-display font-bold text-emerald-950 group-hover:text-amber-600 transition-colors">
                   {stat.value}<span className="text-sm font-sans text-stone-400 font-medium ml-1">{stat.unit}</span>
                </h3>
                <p className="text-stone-500 text-xs font-bold uppercase tracking-wider mt-1">{stat.title}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* 3. Main Chart Area */}
         <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-stone-100 shadow-sm p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8">
               <div>
                  <h3 className="font-serif text-xl font-bold text-emerald-950">Biểu đồ tăng trưởng</h3>
                  <p className="text-stone-400 text-xs mt-1">Dữ liệu truy cập trong 7 ngày qua</p>
               </div>
               <button className="p-2 hover:bg-stone-50 rounded-lg text-stone-400 transition-colors"><MoreHorizontal size={20} /></button>
            </div>
            
            <div className="flex-1 flex items-end gap-4 h-[300px] px-2 pb-2 relative">
               {/* Decorative Grid */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-full h-px bg-stone-50"></div>)}
               </div>

               {[65, 45, 75, 55, 80, 95, 85].map((h, i) => (
                 <div key={i} className="flex-1 flex flex-col justify-end group relative z-10 h-full">
                    <div className="w-full relative h-full flex items-end">
                        <div 
                           className="w-full bg-emerald-100 rounded-t-lg group-hover:bg-amber-100 transition-colors duration-500 absolute bottom-0" 
                           style={{ height: `${h}%` }}
                        ></div>
                        <div 
                           className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg group-hover:from-amber-500 group-hover:to-amber-400 transition-all duration-500 relative shadow-sm" 
                           style={{ height: `${h * 0.7}%` }} // Inner bar
                        >
                           {/* Tooltip */}
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-950 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-xl transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-20">
                              {h * 15} views
                              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-950 rotate-45"></div>
                           </div>
                        </div>
                    </div>
                    <div className="text-center mt-4 text-[10px] font-bold text-stone-400 group-hover:text-emerald-900 transition-colors uppercase tracking-wider">
                       {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* 4. Recent Activity Feed */}
         <div className="bg-white rounded-[1.5rem] border border-stone-100 shadow-sm p-0 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
               <h3 className="font-serif text-xl font-bold text-emerald-950">Hoạt động mới</h3>
               <button className="text-xs font-bold text-amber-600 uppercase tracking-wider hover:underline">Xem tất cả</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {distributors.slice(0, 4).map((d, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-sm flex items-center justify-center text-stone-500 font-bold text-xs relative z-10 group-hover:border-amber-500 group-hover:text-amber-600 transition-colors">
                                {d.name.charAt(0)}
                            </div>
                            {i !== 3 && <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-stone-100"></div>}
                        </div>
                        <div className="pb-2">
                            <p className="text-sm text-stone-800 font-medium leading-snug group-hover:text-amber-700 transition-colors">
                                <span className="font-bold">Đại lý mới:</span> {d.name} đã được thêm vào hệ thống.
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider bg-stone-50 px-2 py-0.5 rounded border border-stone-100">
                                    {d.address.split(',')[0]}
                                </span>
                                <span className="text-[10px] text-stone-300">•</span>
                                <span className="text-[10px] text-stone-400">2 giờ trước</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-4 bg-stone-50 border-t border-stone-100">
               <button className="w-full py-3 rounded-xl border border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-emerald-900 hover:border-emerald-200 transition-all shadow-sm">
                  Tải báo cáo chi tiết
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
