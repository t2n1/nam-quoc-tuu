
import React from 'react';
import { useData } from '../../context/DataContext';
import { Package, Users, Eye, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { products, distributors } = useData();

  const stats = [
    { title: 'Tổng Sản Phẩm', value: products.length, icon: <Package />, color: 'bg-blue-500' },
    { title: 'Đại Lý Ủy Quyền', value: distributors.length, icon: <Users />, color: 'bg-amber-500' },
    { title: 'Lượt Truy Cập', value: '12,543', icon: <Eye />, color: 'bg-emerald-500' },
    { title: 'Doanh Số Tháng', value: '150tr+', icon: <TrendingUp />, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">Tháng này</span>
            </div>
            <h3 className="text-3xl font-bold text-stone-800 mb-1">{stat.value}</h3>
            <p className="text-sm text-stone-500">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-100">
           <h3 className="font-serif text-xl font-bold text-emerald-950 mb-6">Đại Lý Mới Thêm</h3>
           <div className="space-y-4">
             {distributors.slice(-3).map((d, i) => (
               <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-stone-50 border border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                    {d.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-sm">{d.name}</h4>
                    <p className="text-stone-500 text-xs">{d.phone}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded">Active</span>
                  </div>
               </div>
             ))}
           </div>
        </div>

        <div className="bg-emerald-900 p-8 rounded-xl shadow-lg relative overflow-hidden text-white">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <h3 className="font-serif text-xl font-bold text-white mb-4 relative z-10">Mẹo Quản Trị</h3>
           <ul className="space-y-4 text-emerald-100/70 text-sm relative z-10">
             <li className="flex gap-3">
               <span className="text-amber-500">•</span>
               Hãy cập nhật danh sách đại lý thường xuyên để khách hàng tra cứu chính xác.
             </li>
             <li className="flex gap-3">
               <span className="text-amber-500">•</span>
               Hình ảnh sản phẩm nên có tỷ lệ 4:5 để hiển thị đẹp nhất trên website.
             </li>
             <li className="flex gap-3">
               <span className="text-amber-500">•</span>
               Kiểm tra phần "Quy trình" để đảm bảo thông tin OCOP luôn đúng chuẩn.
             </li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
