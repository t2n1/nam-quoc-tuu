
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Empty state for form
  const emptyProduct: Product = {
    id: '',
    name: '',
    volume: '',
    type: 'Lẻ',
    description: '',
    image: 'https://picsum.photos/id/431/600/800'
  };
  
  const [formData, setFormData] = useState<Product>(emptyProduct);

  const handleEdit = (product: Product) => {
    setFormData(product);
    setEditingId(product.id);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setFormData({ ...emptyProduct, id: `p${Date.now()}` });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      addProduct(formData);
    } else {
      updateProduct(formData);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="font-serif text-3xl text-emerald-950 font-bold">Quản Lý Sản Phẩm</h1>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Thêm Sản Phẩm
        </button>
      </div>

      {/* Form Area */}
      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-emerald-900">{isAdding ? 'Thêm Sản Phẩm Mới' : 'Chỉnh Sửa Sản Phẩm'}</h3>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Tên Sản Phẩm</label>
                 <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                 />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Dung tích</label>
                   <input 
                      type="text" 
                      value={formData.volume} 
                      onChange={e => setFormData({...formData, volume: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-stone-700 mb-1">Loại</label>
                   <select 
                      value={formData.type} 
                      onChange={e => setFormData({...formData, type: e.target.value as 'Lẻ' | 'Sỉ'})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                   >
                     <option value="Lẻ">Bán Lẻ</option>
                     <option value="Sỉ">Bán Sỉ</option>
                   </select>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Mô tả</label>
                 <textarea 
                    rows={4}
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                 />
               </div>
            </div>

            <div className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Link Ảnh (URL)</label>
                 <div className="flex gap-2">
                   <input 
                      type="text" 
                      value={formData.image} 
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                   />
                   <div className="p-2 bg-stone-100 rounded-lg text-stone-500">
                     <ImageIcon size={20} />
                   </div>
                 </div>
               </div>
               
               {/* Image Preview */}
               <div className="aspect-[3/4] w-40 rounded-lg overflow-hidden border border-stone-200 bg-stone-50 relative group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x600?text=No+Image')} />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs">
                    Preview
                  </div>
               </div>
               
               <div className="pt-8 flex justify-end">
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
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Hình Ảnh</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Thông Tin</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-12 rounded overflow-hidden">
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-emerald-950">{product.name}</div>
                    <div className="text-xs text-stone-500">ID: {product.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-bold mr-2">{product.volume}</span>
                    <span className="inline-block px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-full">{product.type}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleEdit(product)} className="text-emerald-600 hover:text-emerald-900 p-2 hover:bg-emerald-50 rounded-full transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
