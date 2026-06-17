
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Link2 } from 'lucide-react';

const AdminBlog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const emptyPost: BlogPost = {
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    date: new Date().toLocaleDateString('vi-VN'),
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=800&auto=format&fit=crop',
    category: 'Tin Tức',
    author: 'Ban Biên Tập'
  };
  
  const [formData, setFormData] = useState<BlogPost>(emptyPost);

  // Helper to generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .trim()
      .replace(/\s+/g, '-'); // Replace spaces with dashes
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Only auto-update slug if we are adding new or if user hasn't manually edited slug yet (simplification)
    // Here we just auto-update it for convenience, user can edit slug later
    setFormData(prev => ({
        ...prev, 
        title, 
        slug: generateSlug(title)
    }));
  };

  const handleEdit = (post: BlogPost) => {
    setFormData(post);
    setEditingId(post.id);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setFormData({ ...emptyPost, id: `n${Date.now()}` });
    setIsAdding(true);
    setEditingId(null);
  };

  const handleSave = () => {
    if (isAdding) {
      addBlogPost(formData);
    } else {
      updateBlogPost(formData);
    }
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deleteBlogPost(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="font-serif text-3xl text-emerald-950 font-bold">Quản Lý Blog</h1>
           <p className="text-stone-500 text-sm mt-1">Viết bài để SEO và cập nhật tin tức cho khách hàng.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
        >
          <Plus size={18} /> Viết Bài Mới
        </button>
      </div>

      {/* Form Area */}
      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100 animate-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-emerald-900">{isAdding ? 'Soạn Thảo Bài Viết' : 'Chỉnh Sửa Bài Viết'}</h3>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-stone-400 hover:text-red-500">
              <X size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Editor */}
            <div className="md:col-span-2 space-y-6">
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Tiêu Đề Bài Viết</label>
                 <input 
                    type="text" 
                    value={formData.title} 
                    onChange={handleTitleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-lg font-bold text-emerald-950"
                    placeholder="Nhập tiêu đề..."
                 />
               </div>
               
               <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1 flex items-center gap-2">
                     <Link2 size={14} /> Đường dẫn SEO (Slug)
                  </label>
                  <input 
                    type="text" 
                    value={formData.slug} 
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-600 font-mono text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <p className="text-xs text-stone-400 mt-1">URL sẽ là: domain.com/news/{formData.slug}</p>
               </div>

               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Mô tả ngắn (Meta Description)</label>
                 <textarea 
                    rows={3}
                    value={formData.excerpt} 
                    onChange={e => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="Tóm tắt nội dung bài viết..."
                 />
               </div>

               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Nội Dung Chi Tiết (HTML)</label>
                 <textarea 
                    rows={15}
                    value={formData.content} 
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none font-mono text-sm leading-relaxed"
                    placeholder="Viết nội dung ở đây. Hỗ trợ thẻ HTML cơ bản như <p>, <b>, <h2>..."
                 />
               </div>
            </div>

            {/* Right Column: Meta & Image */}
            <div className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-stone-700 mb-1">Ảnh Đại Diện (URL)</label>
                 <div className="flex gap-2">
                   <input 
                      type="text" 
                      value={formData.image} 
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                   />
                 </div>
               </div>
               
               {/* Image Preview */}
               <div className="aspect-video w-full rounded-lg overflow-hidden border border-stone-200 bg-stone-50 relative group">
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image')} />
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Danh Mục</label>
                    <select 
                        value={formData.category} 
                        onChange={e => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                    >
                        <option>Tin Tức</option>
                        <option>Văn Hóa</option>
                        <option>Kiến Thức</option>
                        <option>Khuyến Mãi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Tác Giả</label>
                    <input 
                        type="text" 
                        value={formData.author} 
                        onChange={e => setFormData({...formData, author: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
               </div>
               
               <div className="pt-8 border-t border-stone-100">
                 <button 
                   onClick={handleSave}
                   className="w-full flex items-center justify-center gap-2 bg-emerald-950 text-white px-8 py-3 rounded-lg hover:bg-emerald-900 transition-colors shadow-lg"
                 >
                   <Save size={18} /> {isAdding ? 'Đăng Bài' : 'Lưu Thay Đổi'}
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
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Bài Viết</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Danh Mục</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Ngày Đăng</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-16 rounded overflow-hidden shrink-0">
                           <img src={post.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <div className="font-bold text-emerald-950 line-clamp-1">{post.title}</div>
                            <div className="text-xs text-stone-400 font-mono">/{post.slug}</div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-bold">{post.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => handleEdit(post)} className="text-emerald-600 hover:text-emerald-900 p-2 hover:bg-emerald-50 rounded-full transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors">
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

export default AdminBlog;
