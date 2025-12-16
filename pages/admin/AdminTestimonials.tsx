
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Testimonial } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';

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

  const handleSave = () => {
    if (isAdding) {
      addTestimonial(formData);
    } else {
      updateTestimonial(formData);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Xóa đánh giá này?')) {
      deleteTestimonial(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-serif text-3xl text-emerald-950 font-bold">Khách Hàng Đánh Giá</h1>
           <p className="text-stone-500 text-sm mt-1">Quản lý các lời khen (Reviews) hiển thị trên trang chủ.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Thêm Mới
        </button>
      </div>

      {/* Form Area */}
      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-emerald-900">{isAdding ? 'Thêm Đánh Giá Mới' : 'Chỉnh Sửa Đánh Giá'}</h3>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Tên Khách Hàng</label>
                 <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Nguyễn Văn A"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Vai Trò / Địa Chỉ</label>
                 <input 
                    type="text" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Khách hàng Hà Nội"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Nội Dung Đánh Giá</label>
                 <textarea 
                    rows={4}
                    value={formData.content} 
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Sản phẩm rất tốt..."
                 />
               </div>
            </div>

            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Link Ảnh Avatar (URL)</label>
                 <div className="flex gap-2">
                   <input 
                      type="text" 
                      value={formData.avatar} 
                      onChange={e => setFormData({...formData, avatar: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                   />
                 </div>
               </div>
               
               {/* Image Preview */}
               <div className="flex justify-center py-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-stone-200 bg-stone-50">
                     <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/100?text=Avatar')} />
                  </div>
               </div>
               
               <div className="pt-4 flex justify-end">
                 <button 
                   onClick={handleSave}
                   className="flex items-center gap-2 bg-emerald-950 text-white px-8 py-3 rounded-lg hover:bg-emerald-900 transition-colors shadow-lg"
                 >
                   <Save size={18} /> Lưu Thay Đổi
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* List Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm relative group">
             <div className="flex items-start justify-between mb-4">
               <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full overflow-hidden bg-stone-100">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                 </div>
                 <div>
                    <h4 className="font-bold text-emerald-950">{item.name}</h4>
                    <p className="text-xs text-stone-500">{item.role}</p>
                 </div>
               </div>
               <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(item)} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:bg-red-50 p-1 rounded">
                    <Trash2 size={16} />
                  </button>
               </div>
             </div>
             <p className="text-stone-600 text-sm italic border-l-2 border-amber-500 pl-3">
               "{item.content}"
             </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;
