
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Testimonial } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Quote } from 'lucide-react';

const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const emptyTestimonial: Testimonial = {
    id: '',
    name: '',
    role: '',
    content: '',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
  };
  
  const [formData, setFormData] = useState<Testimonial>(emptyTestimonial);

  const handleEdit = (item: Testimonial) => {
    setFormData(item);
    setEditingId(item.id);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setFormData({ ...emptyTestimonial, id: `t${Date.now()}` });
    setIsAdding(true);
    setEditingId(null);
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingId(null);
  }

  const handleSave = () => {
    if (isAdding) {
      addTestimonial(formData);
    } else {
      updateTestimonial(formData);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa đánh giá này?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
        <div>
           <h1 className="font-serif text-2xl text-emerald-950 font-bold">Khách Hàng Đánh Giá</h1>
           <p className="text-stone-500 text-xs mt-1">Quản lý đánh giá/cảm nhận hiển thị trên trang chủ.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Thêm Mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all group flex flex-col h-full">
             <div className="flex items-start justify-between mb-6">
               <div className="flex items-center gap-4">
                 <div className="w-14 h-14 rounded-full overflow-hidden bg-stone-100 border-2 border-white shadow-md">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-950 text-lg leading-tight">{item.name}</h4>
                    <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-1">{item.role}</p>
                 </div>
               </div>
               <Quote size={24} className="text-stone-200 group-hover:text-amber-200 transition-colors" />
             </div>
             
             <div className="flex-1">
                <p className="text-stone-600 text-sm leading-relaxed italic">"{item.content}"</p>
             </div>

             <div className="mt-6 pt-4 border-t border-stone-100 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
             </div>
          </div>
        ))}
      </div>

      {/* DRAWER FORM */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-fade-in-up">
             <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <h3 className="font-serif text-xl font-bold text-emerald-950">{isAdding ? 'Thêm Đánh Giá' : 'Chỉnh Sửa'}</h3>
                <button onClick={closeModal} className="text-stone-400 hover:text-red-500"><X size={24} /></button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Thông tin khách hàng</label>
                    <div className="space-y-4">
                        <input 
                            type="text" 
                            value={formData.name} 
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="Họ và tên..."
                        />
                        <input 
                            type="text" 
                            value={formData.role} 
                            onChange={e => setFormData({...formData, role: e.target.value})}
                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="Chức vụ / Địa chỉ..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Ảnh Avatar (URL)</label>
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                            <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100?text=Avatar')} />
                        </div>
                        <input 
                            type="text" 
                            value={formData.avatar} 
                            onChange={e => setFormData({...formData, avatar: e.target.value})}
                            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase mb-2">Nội dung đánh giá</label>
                    <textarea 
                        rows={5}
                        value={formData.content} 
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed"
                        placeholder="Khách hàng nói gì về sản phẩm..."
                    />
                </div>
             </div>

             <div className="p-6 border-t border-stone-200">
                 <button 
                   onClick={handleSave}
                   className="w-full flex items-center justify-center gap-2 bg-emerald-950 text-white py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg font-bold uppercase tracking-wider text-sm"
                 >
                   <Save size={18} /> Lưu Thông Tin
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
