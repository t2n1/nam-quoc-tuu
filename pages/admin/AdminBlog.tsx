
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPost } from '../../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Link2, Search, Calendar, User, Eye } from 'lucide-react';

const AdminBlog: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const emptyPost: BlogPost = {
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    date: new Date().toLocaleDateString('vi-VN'),
    image: 'https://images.unsplash.com/photo-1541533260371-b8fc9b030eb3?q=80&w=800&auto=format&fit=crop',
    category: 'Tin Tức',
    author: 'Ban Biên Tập'
  };
  
  const [formData, setFormData] = useState<BlogPost>(emptyPost);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (isAdding) {
        setFormData(prev => ({ ...prev, title, slug: generateSlug(title) }));
    } else {
        setFormData(prev => ({ ...prev, title }));
    }
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

  const closeModal = () => {
    setIsAdding(false);
    setEditingId(null);
  }

  const handleSave = () => {
    if (isAdding) {
      addBlogPost(formData);
    } else {
      updateBlogPost(formData);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deleteBlogPost(id);
    }
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-stone-200 shadow-sm sticky top-0 z-10">
         <div className="flex items-center bg-stone-100 rounded-lg px-3 py-2 w-full md:w-96 border border-transparent focus-within:border-amber-500 focus-within:bg-white transition-all">
            <Search size={18} className="text-stone-400 mr-2" />
            <input 
                type="text" 
                placeholder="Tìm kiếm bài viết..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-stone-700 placeholder-stone-400" 
            />
         </div>
         <button 
           onClick={handleAddNew}
           className="flex items-center justify-center gap-2 bg-emerald-950 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors shadow-md text-sm font-bold uppercase tracking-wider"
         >
           <Plus size={18} /> Viết Bài Mới
         </button>
      </div>

      {/* Blog Grid Layout */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 group">
                <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden shrink-0 relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded">{post.category}</span>
                            <span className="text-stone-400 text-xs flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-emerald-950 mb-2 leading-tight group-hover:text-amber-700 transition-colors">{post.title}</h3>
                        <p className="text-stone-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-stone-100 pt-3 mt-2">
                        <div className="flex items-center gap-2 text-xs text-stone-400">
                            <User size={12} /> {post.author}
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(post)} className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
                                <Edit2 size={14} /> Sửa
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="flex items-center gap-1 text-xs font-bold text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                                <Trash2 size={14} /> Xóa
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* DRAWER FORM */}
      {(isAdding || editingId) && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
          
          <div className="relative w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col animate-fade-in-up">
             <div className="p-6 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <div>
                   <h3 className="font-serif text-2xl font-bold text-emerald-950">{isAdding ? 'Soạn Thảo Bài Viết' : 'Chỉnh Sửa Bài Viết'}</h3>
                   <p className="text-xs text-stone-500 mt-1">Nội dung chất lượng giúp tăng thứ hạng SEO.</p>
                </div>
                <button onClick={closeModal} className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 hover:text-red-500 hover:border-red-200 transition-all">
                   <X size={18} />
                </button>
             </div>
             
             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-stone-50/30">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Tiêu đề bài viết</label>
                            <input 
                                type="text" 
                                value={formData.title} 
                                onChange={handleTitleChange}
                                className="w-full text-2xl font-serif font-bold text-emerald-950 placeholder-stone-300 border-b border-stone-200 pb-2 focus:border-amber-500 outline-none transition-colors"
                                placeholder="Nhập tiêu đề hấp dẫn..."
                            />
                            <div className="mt-3 flex items-center gap-2 text-xs text-stone-400 bg-stone-50 p-2 rounded">
                                <Link2 size={12} />
                                <span className="font-mono truncate">vcheck.jp/news/{formData.slug}</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Mô tả ngắn (Excerpt)</label>
                            <textarea 
                                rows={3}
                                value={formData.excerpt} 
                                onChange={e => setFormData({...formData, excerpt: e.target.value})}
                                className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:border-amber-500 outline-none text-sm text-stone-600"
                                placeholder="Đoạn mở đầu hiển thị trên danh sách..."
                            />
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm h-[500px] flex flex-col">
                            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Nội dung chi tiết (HTML)</label>
                            <textarea 
                                value={formData.content} 
                                onChange={e => setFormData({...formData, content: e.target.value})}
                                className="flex-1 w-full p-4 bg-stone-50 rounded-lg border border-stone-200 focus:border-amber-500 outline-none font-mono text-sm leading-relaxed resize-none"
                                placeholder="<p>Nội dung bài viết...</p>"
                            />
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <h4 className="font-bold text-emerald-900 text-sm mb-4 border-b border-stone-100 pb-2">Thông tin chung</h4>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Danh Mục</label>
                                    <select 
                                        value={formData.category} 
                                        onChange={e => setFormData({...formData, category: e.target.value})}
                                        className="w-full p-2 border border-stone-200 rounded-lg text-sm bg-white"
                                    >
                                        <option>Tin Tức</option>
                                        <option>Văn Hóa</option>
                                        <option>Kiến Thức</option>
                                        <option>Sự Kiện</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Tác Giả</label>
                                    <input 
                                        type="text" 
                                        value={formData.author} 
                                        onChange={e => setFormData({...formData, author: e.target.value})}
                                        className="w-full p-2 border border-stone-200 rounded-lg text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Ngày Đăng</label>
                                    <input 
                                        type="text" 
                                        value={formData.date} 
                                        onChange={e => setFormData({...formData, date: e.target.value})}
                                        className="w-full p-2 border border-stone-200 rounded-lg text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                            <h4 className="font-bold text-emerald-900 text-sm mb-4 border-b border-stone-100 pb-2">Ảnh Đại Diện</h4>
                            <div className="space-y-3">
                                <div className="aspect-video w-full bg-stone-100 rounded-lg overflow-hidden border border-stone-200 relative group">
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=No+Image')} />
                                </div>
                                <input 
                                    type="text" 
                                    value={formData.image} 
                                    onChange={e => setFormData({...formData, image: e.target.value})}
                                    className="w-full p-2 border border-stone-200 rounded-lg text-xs"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
             </div>

             <div className="p-6 border-t border-stone-200 bg-white flex justify-end gap-4">
                <button onClick={closeModal} className="px-6 py-3 rounded-lg text-stone-500 font-bold hover:bg-stone-100 transition-colors">
                   Hủy bỏ
                </button>
                <button onClick={handleSave} className="px-8 py-3 rounded-lg bg-emerald-950 text-white font-bold shadow-lg hover:bg-amber-600 transition-colors flex items-center gap-2">
                   <Save size={18} /> {isAdding ? 'Đăng Bài' : 'Lưu Thay Đổi'}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
