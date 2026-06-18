
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Utensils, BarChart, ChevronRight, Search, Filter, MoreVertical } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'details' | 'images' | 'taste'>('info');
  
  const emptyProduct: Product = {
    id: '',
    name: '',
    volume: '',
    type: 'Lẻ',
    description: '',
    image: 'https://picsum.photos/id/431/600/800',
    scales: { sweetness: 3, aroma: 3, body: 3, finish: 3, intensity: 3 },
    pairings: []
  };
  
  const [formData, setFormData] = useState<Product>(emptyProduct);

  const handleEdit = (product: Product) => {
    setFormData({
        ...product,
        scales: product.scales || { sweetness: 3, aroma: 3, body: 3, finish: 3, intensity: 3 },
        pairings: product.pairings || []
    });
    setEditingId(product.id);
    setIsAdding(false);
    setActiveTab('info');
  };

  const handleAddNew = () => {
    setFormData({ ...emptyProduct, id: `p${Date.now()}` });
    setIsAdding(true);
    setEditingId(null);
    setActiveTab('info');
  };

  const closeModal = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      addProduct(formData);
    } else {
      updateProduct(formData);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      deleteProduct(id);
    }
  };

  const ScaleInput = ({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) => (
    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
        <div className="flex justify-between mb-3">
           <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{label}</label>
           <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{value}/5</span>
        </div>
        <input 
            type="range" 
            min="1" 
            max="5" 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-amber-600 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer" 
        />
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-5 rounded-[1.5rem] border border-stone-200 shadow-sm sticky top-2 z-10 backdrop-blur-xl bg-white/90">
         <div className="flex items-center gap-4 w-full md:w-auto">
            <h1 className="font-serif text-2xl font-bold text-emerald-950 hidden md:block">Sản Phẩm</h1>
            <div className="h-8 w-px bg-stone-200 hidden md:block"></div>
            <div className="flex items-center bg-stone-100 hover:bg-white rounded-xl px-4 py-2.5 w-full md:w-80 border border-transparent focus-within:border-amber-500 focus-within:shadow-md transition-all group">
                <Search size={18} className="text-stone-400 group-focus-within:text-amber-500 transition-colors mr-2" />
                <input type="text" placeholder="Tìm kiếm sản phẩm..." className="bg-transparent border-none outline-none text-sm w-full text-emerald-900 placeholder-stone-400 font-medium" />
            </div>
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-stone-200 text-stone-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm">
               <Filter size={16} /> Bộ lọc
            </button>
            <button 
              onClick={handleAddNew}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-950 text-white px-6 py-2.5 rounded-xl hover:bg-amber-600 transition-all shadow-lg hover:shadow-amber-500/20 text-xs font-bold uppercase tracking-wider transform hover:-translate-y-0.5"
            >
              <Plus size={16} /> Thêm Mới
            </button>
         </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {products.map((product) => (
            <div key={product.id} className="bg-white rounded-[1.5rem] border border-stone-100 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 group overflow-hidden flex flex-col relative">
               
               {/* Image Area */}
               <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Floating Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300 delay-100">
                     <button onClick={() => handleEdit(product)} className="w-10 h-10 bg-white/90 backdrop-blur text-emerald-700 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-white transition-all"><Edit2 size={16}/></button>
                     <button onClick={() => handleDelete(product.id)} className="w-10 h-10 bg-white/90 backdrop-blur text-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                  </div>

                  <div className="absolute top-4 left-4">
                     <span className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm backdrop-blur-md ${product.type === 'Lẻ' ? 'bg-amber-500/90 text-white' : 'bg-blue-500/90 text-white'}`}>
                        {product.type}
                     </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                     <div className="text-amber-400 text-xs font-serif italic mb-1">Vol. {product.volume}</div>
                     <h3 className="font-serif text-2xl font-bold leading-none mb-2">{product.name}</h3>
                  </div>
               </div>

               {/* Info Area */}
               <div className="p-6 flex-1 flex flex-col bg-white relative z-10">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-100">
                      <div className="text-xs text-stone-400 font-bold uppercase tracking-wider">ID: {product.id}</div>
                      <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Còn hàng</div>
                  </div>
                  <button onClick={() => handleEdit(product)} className="mt-auto w-full py-3 rounded-xl border border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-wider hover:bg-emerald-950 hover:text-white hover:border-emerald-950 transition-all flex items-center justify-center gap-2 group/btn">
                     Chỉnh sửa chi tiết <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
         ))}
      </div>

      {/* MODAL / DRAWER FORM */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
             <div className="p-6 md:p-8 border-b border-stone-200 flex justify-between items-center bg-white sticky top-0 z-20">
                <div>
                   <h3 className="font-serif text-3xl font-bold text-emerald-950">{isAdding ? 'Sản Phẩm Mới' : 'Cập Nhật Sản Phẩm'}</h3>
                   <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-bold">Quản lý thông tin & hình ảnh</p>
                </div>
                <button onClick={closeModal} className="w-10 h-10 rounded-full bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-500 flex items-center justify-center transition-all">
                   <X size={20} />
                </button>
             </div>

             {/* Tab Navigation */}
             <div className="flex border-b border-stone-200 px-8 bg-stone-50/50 sticky top-[89px] z-10 overflow-x-auto">
                {[
                   { id: 'info', label: 'Thông Tin', icon: <Utensils size={14} /> },
                   { id: 'details', label: 'Món Ăn Kèm', icon: <Utensils size={14} /> },
                   { id: 'images', label: 'Hình Ảnh', icon: <ImageIcon size={14} /> },
                   { id: 'taste', label: 'Hương Vị', icon: <BarChart size={14} /> }
                ].map(tab => (
                   <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                         activeTab === tab.id 
                         ? 'border-amber-500 text-amber-600 bg-amber-50/30' 
                         : 'border-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-100'
                      }`}
                   >
                      {tab.label}
                   </button>
                ))}
             </div>

             {/* Form Content */}
             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#f8fafc]">
                
                {activeTab === 'info' && (
                   <div className="space-y-6 animate-fade-in-up">
                      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                          <div className="mb-6">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Tên Sản Phẩm</label>
                            <input 
                                type="text" 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all bg-stone-50/30 text-lg font-serif text-emerald-950 font-bold"
                                placeholder="Nhập tên sản phẩm..."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                               <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Dung tích</label>
                               <input 
                                   type="text" 
                                   value={formData.volume} 
                                   onChange={e => setFormData({...formData, volume: e.target.value})}
                                   className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all bg-stone-50/30"
                               />
                             </div>
                             <div>
                               <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Loại Phân Phối</label>
                               <div className="relative">
                                  <select 
                                      value={formData.type} 
                                      onChange={e => setFormData({...formData, type: e.target.value as 'Lẻ' | 'Sỉ'})}
                                      className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none bg-stone-50/30 transition-all appearance-none cursor-pointer font-bold text-emerald-900"
                                  >
                                    <option value="Lẻ">Bán Lẻ</option>
                                    <option value="Sỉ">Bán Sỉ</option>
                                  </select>
                                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-stone-400 pointer-events-none" size={16} />
                               </div>
                             </div>
                          </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">Mô tả giới thiệu</label>
                        <textarea 
                            rows={6}
                            value={formData.description} 
                            onChange={e => setFormData({...formData, description: e.target.value})}
                            className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all bg-stone-50/30 text-sm leading-relaxed"
                            placeholder="Mô tả ngắn gọn, hấp dẫn về sản phẩm..."
                        />
                      </div>
                   </div>
                )}

                {/* Other tabs follow same premium styling... simplified for brevity but applying same classes */}
                {activeTab === 'details' && (
                    <div className="space-y-6 animate-fade-in-up">
                         {/* ... pairing implementation similar to before but with new classes ... */}
                         {formData.pairings?.map((pairing, idx) => (
                         <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 relative group shadow-sm hover:shadow-md transition-all">
                             <button onClick={() => {const newPairings = formData.pairings?.filter((_, i) => i !== idx); setFormData({...formData, pairings: newPairings});}} className="absolute top-4 right-4 text-stone-300 hover:text-red-500 transition-colors"><X size={18} /></button>
                             <div className="grid gap-4">
                                <input value={pairing.name} onChange={(e) => {const newPairings = [...(formData.pairings || [])]; newPairings[idx].name = e.target.value; setFormData({...formData, pairings: newPairings});}} className="w-full font-serif font-bold text-lg border-b border-stone-200 pb-2 focus:border-amber-500 outline-none text-emerald-950 placeholder-stone-300" placeholder="Tên món ăn" />
                                <input value={pairing.description} onChange={(e) => {const newPairings = [...(formData.pairings || [])]; newPairings[idx].description = e.target.value; setFormData({...formData, pairings: newPairings});}} className="w-full text-sm text-stone-500 border-none outline-none bg-stone-50 p-2 rounded-lg" placeholder="Mô tả ngắn..." />
                                <input value={pairing.image} onChange={(e) => {const newPairings = [...(formData.pairings || [])]; newPairings[idx].image = e.target.value; setFormData({...formData, pairings: newPairings});}} className="w-full text-xs font-mono text-stone-400 border border-stone-200 rounded-lg p-2" placeholder="URL Hình ảnh" />
                             </div>
                         </div>
                         ))}
                         <button onClick={() => {setFormData({...formData, pairings: [...(formData.pairings || []), { name: '', image: '', description: '' }]});}} className="w-full py-4 border-2 border-dashed border-stone-300 rounded-2xl text-stone-500 font-bold text-sm hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50 transition-all flex items-center justify-center gap-2">+ Thêm Món Ăn</button>
                    </div>
                )}
                
                {activeTab === 'images' && (
                    <div className="space-y-6 animate-fade-in-up">
                         <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Preview Hình Ảnh</label>
                            <div className="relative aspect-[3/4] w-full md:w-64 mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100 group">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x600?text=No+Image')} />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest">Xem trước</div>
                            </div>
                            <div className="mt-6">
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2">URL Hình Ảnh</label>
                                <input type="text" value={formData.image} onChange={e => setFormData({...formData,image: e.target.value})} className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none text-sm font-mono text-stone-600" />
                            </div>
                         </div>
                    </div>
                )}

                {activeTab === 'taste' && (
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
                           <div className="p-3 bg-white rounded-full text-emerald-600 shadow-sm"><BarChart size={24}/></div>
                           <div>
                              <h4 className="font-bold text-emerald-900">Biểu Đồ Radar</h4>
                              <p className="text-xs text-emerald-700/70">Điều chỉnh các chỉ số từ 1-5 để tạo biểu đồ hương vị.</p>
                           </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                          <ScaleInput label="Độ Ngọt (Sweetness)" value={formData.scales?.sweetness || 1} onChange={(v) => setFormData({...formData, scales: {...formData.scales!, sweetness: v}})} />
                          <ScaleInput label="Hương Thơm (Aroma)" value={formData.scales?.aroma || 1} onChange={(v) => setFormData({...formData, scales: {...formData.scales!, aroma: v}})} />
                          <ScaleInput label="Cấu Trúc (Body)" value={formData.scales?.body || 1} onChange={(v) => setFormData({...formData, scales: {...formData.scales!, body: v}})} />
                          <ScaleInput label="Hậu Vị (Finish)" value={formData.scales?.finish || 1} onChange={(v) => setFormData({...formData, scales: {...formData.scales!, finish: v}})} />
                          <ScaleInput label="Độ Mạnh (Intensity)" value={formData.scales?.intensity || 1} onChange={(v) => setFormData({...formData, scales: {...formData.scales!, intensity: v}})} />
                        </div>
                    </div>
                )}
             </div>

             {/* Footer Actions */}
             <div className="p-6 md:p-8 border-t border-stone-200 bg-white flex justify-between items-center z-20">
                <button onClick={closeModal} className="px-6 py-3 rounded-xl text-stone-500 font-bold hover:bg-stone-50 transition-colors text-xs uppercase tracking-wider">
                   Hủy bỏ
                </button>
                <button onClick={handleSave} className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white font-bold shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2 text-xs uppercase tracking-wider">
                   <Save size={16} /> Lưu Thay Đổi
                </button>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
