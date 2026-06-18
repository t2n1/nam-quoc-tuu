
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Distributor } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Search, Smartphone, MapPin, ShieldCheck } from 'lucide-react';

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
         <div className="flex items-center bg-stone-100 rounded-lg px-3 py-2 w-full md:w-80 border border-transparent focus-within:border-amber-500 focus-within:bg-white transition-all">
            <Search size={18} className="text-stone-400 mr-2" />
            <input 
              type="text" 
              placeholder="Tìm SĐT hoặc tên đại lý..." 
              className="bg-transparent border-none outline-none text-sm w-full" 
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
         </div>
         <button 
           onClick={handleAddNew}
           className="flex items-center justify-center gap-2 bg-emerald-950 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
         >
           <Plus size={18} /> Thêm Đại Lý
         </button>
      </div>

      {/* Grid Layout for Distributors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredData.map(distributor => (
            <div key={distributor.phone} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-lg transition-all group">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg border border-emerald-100">
                        {distributor.name.charAt(0)}
                     </div>
                     <div>
                        <h4 className="font-bold text-emerald-950 leading-tight">{distributor.name}</h4>
                        <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 ${distributor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                           {distributor.status === 'active' ? <ShieldCheck size={10} /> : null} {distributor.status}
                        </span>
                     </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => handleEdit(distributor)} className="p-2 text-stone-400 hover:bg-stone-100 hover:text-amber-600 rounded-lg transition-colors"><Edit2 size={16}/></button>
                     <button onClick={() => handleDelete(distributor.phone)} className="p-2 text-stone-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16}/></button>
                  </div>
               </div>
               
               <div className="space-y-3 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-3 text-sm text-stone-600">
                     <Smartphone size={16} className="text-stone-400" />
                     <span className="font-mono font-medium">{distributor.phone}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-stone-600">
                     <MapPin size={16} className="text-stone-400 mt-0.5 shrink-0" />
                     <span className="line-clamp-2">{distributor.address}</span>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* MODAL FORM */}
      {(isAdding || editingPhone) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setIsAdding(false); setEditingPhone(null); }}></div>
          
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
             <div className="bg-emerald-950 p-6 flex justify-between items-center text-white">
                <h3 className="font-serif text-xl font-bold">{isAdding ? 'Thêm Đại Lý Mới' : 'Cập Nhật Thông Tin'}</h3>
                <button onClick={() => { setIsAdding(false); setEditingPhone(null); }} className="text-white/50 hover:text-white"><X size={24}/></button>
             </div>
             
             <div className="p-8 space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Số Điện Thoại (ID)</label>
                    <div className="relative">
                       <Smartphone className="absolute left-3 top-3 text-stone-400" size={18} />
                       <input 
                          type="text" 
                          value={formData.phone} 
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          disabled={!isAdding}
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-amber-500 transition-colors ${!isAdding ? 'bg-stone-100 text-stone-500' : 'border-stone-300'}`}
                          placeholder="09xxx..."
                       />
                    </div>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Tên Đại Lý / Chủ Hộ</label>
                    <input 
                       type="text" 
                       value={formData.name} 
                       onChange={e => setFormData({...formData, name: e.target.value})}
                       className="w-full px-4 py-3 border border-stone-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
                       placeholder="Nhập tên..."
                    />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Địa Chỉ Chính Xác</label>
                    <textarea 
                       rows={2}
                       value={formData.address} 
                       onChange={e => setFormData({...formData, address: e.target.value})}
                       className="w-full px-4 py-3 border border-stone-300 rounded-lg outline-none focus:border-amber-500 transition-colors"
                       placeholder="Số nhà, đường, phường/xã..."
                    />
                 </div>
                 
                 <div className="pt-4">
                    <button 
                       onClick={handleSave}
                       className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                       <Save size={20} /> Lưu Thông Tin
                    </button>
                 </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDistributors;
