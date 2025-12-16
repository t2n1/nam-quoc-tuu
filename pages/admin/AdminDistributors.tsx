
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Distributor } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Search, Smartphone } from 'lucide-react';

const AdminDistributors: React.FC = () => {
  const { distributors, addDistributor, updateDistributor, deleteDistributor } = useData();
  const [editingPhone, setEditingPhone] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState('');
  
  const emptyDistributor: Distributor = {
    phone: '',
    name: '',
    address: '',
    status: 'active'
  };
  
  const [formData, setFormData] = useState<Distributor>(emptyDistributor);

  const handleEdit = (distributor: Distributor) => {
    setFormData(distributor);
    setEditingPhone(distributor.phone);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setFormData(emptyDistributor);
    setIsAdding(true);
    setEditingPhone(null);
  };

  const handleSave = () => {
    if (isAdding) {
      // Check if phone exists
      if (distributors.some(d => d.phone === formData.phone)) {
        alert('Số điện thoại này đã tồn tại!');
        return;
      }
      addDistributor(formData);
    } else {
      updateDistributor(formData);
    }
    setEditingPhone(null);
    setIsAdding(false);
  };

  const handleDelete = (phone: string) => {
    if (window.confirm(`Xóa đại lý ${phone}?`)) {
      deleteDistributor(phone);
    }
  };

  const filteredData = distributors.filter(d => 
    d.name.toLowerCase().includes(filter.toLowerCase()) || 
    d.phone.includes(filter)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="font-serif text-3xl text-emerald-950 font-bold">Quản Lý Đại Lý</h1>
           <p className="text-stone-500 text-sm mt-1">Dữ liệu này dùng để khách hàng tra cứu nguồn gốc sản phẩm.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-emerald-950 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Thêm Đại Lý
        </button>
      </div>

      {/* Form Area */}
      {(isAdding || editingPhone) && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-emerald-900">{isAdding ? 'Đăng Ký Đại Lý Mới' : 'Cập Nhật Thông Tin'}</h3>
            <button onClick={() => { setIsAdding(false); setEditingPhone(null); }} className="text-stone-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
               <label className="block text-sm font-medium text-stone-700 mb-1">Số Điện Thoại (Key ID)</label>
               <div className="relative">
                 <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    disabled={!isAdding} // Cannot change ID when editing
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none ${!isAdding ? 'bg-stone-100 text-stone-500' : ''}`}
                    placeholder="09xxx..."
                 />
                 <Smartphone className="absolute left-3 top-2.5 text-stone-400" size={18} />
               </div>
               {!isAdding && <p className="text-xs text-stone-400 mt-1">*Không thể sửa số điện thoại, vui lòng xóa và tạo mới nếu cần.</p>}
             </div>
             
             <div>
               <label className="block text-sm font-medium text-stone-700 mb-1">Tên Đại Lý / Chủ Hộ</label>
               <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
               />
             </div>

             <div className="md:col-span-2">
               <label className="block text-sm font-medium text-stone-700 mb-1">Địa Chỉ</label>
               <input 
                  type="text" 
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
               />
             </div>
             
             <div className="md:col-span-2 flex justify-end">
                 <button 
                   onClick={handleSave}
                   className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-lg"
                 >
                   <Save size={18} /> {isAdding ? 'Thêm Mới' : 'Cập Nhật'}
                 </button>
             </div>
          </div>
        </div>
      )}

      {/* List Area */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex items-center gap-2">
           <Search size={20} className="text-stone-400" />
           <input 
             type="text" 
             placeholder="Tìm kiếm theo tên hoặc số điện thoại..." 
             className="bg-transparent border-none focus:ring-0 w-full outline-none text-sm"
             value={filter}
             onChange={e => setFilter(e.target.value)}
           />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Số Điện Thoại</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Tên Đại Lý</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Địa Chỉ</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-stone-500 uppercase tracking-wider">Trạng Thái</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredData.map((distributor) => (
                <tr key={distributor.phone} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded w-fit">{distributor.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-emerald-950">
                    {distributor.name}
                  </td>
                  <td className="px-6 py-4 text-stone-600 text-sm">
                    {distributor.address}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${distributor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {distributor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleEdit(distributor)} className="text-emerald-600 hover:text-emerald-900 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(distributor.phone)} className="text-red-400 hover:text-red-700 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                      Không tìm thấy dữ liệu phù hợp.
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDistributors;
