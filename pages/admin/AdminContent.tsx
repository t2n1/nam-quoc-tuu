
import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Save, Image as ImageIcon, ChevronRight, Home, BookOpen, ShoppingBag, ClipboardList, MapPin, Phone, Globe, Plus, Trash2 } from 'lucide-react';
import { SiteContent } from '../../types';

const AdminContent: React.FC = () => {
  const { siteContent, updateSiteContent } = useData();
  const [formData, setFormData] = useState<SiteContent>(siteContent);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(siteContent);
  }, [siteContent]);

  const handleSave = () => {
    updateSiteContent(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Menu Configuration - ONLY PAGES
  const menuItems = [
    { id: 'hero', label: 'Hero Banner', icon: <ImageIcon size={18} />, desc: 'Ảnh bìa trang chủ' },
    { id: 'home', label: 'Trang Chủ', icon: <Home size={18} />, desc: 'Các section chính' },
    { id: 'home_extra', label: 'Trưng Bày & Quốc Tế', icon: <Globe size={18} />, desc: 'Slide ảnh & Xuất khẩu Nhật' },
    { id: 'story', label: 'Di Sản (Story)', icon: <BookOpen size={18} />, desc: 'Trang câu chuyện' },
    { id: 'products', label: 'Sản Phẩm (Page)', icon: <ShoppingBag size={18} />, desc: 'Header trang sản phẩm' },
    { id: 'process', label: 'Quy Trình (Page)', icon: <ClipboardList size={18} />, desc: 'Trang sản xuất' },
    { id: 'traceability', label: 'Tra Cứu (Page)', icon: <MapPin size={18} />, desc: 'Trang tìm kiếm đại lý' },
    { id: 'contact', label: 'Liên Hệ (Page)', icon: <Phone size={18} />, desc: 'Trang liên hệ & Form' },
  ];

  const updateNested = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < keys.length - 1; i++) {
         if (!current[keys[i]]) current[keys[i]] = {}; 
         current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // Helpers
  const addGalleryImage = () => updateNested('home.gallery.images', [...(formData.home.gallery?.images || []), '']);
  const removeGalleryImage = (index: number) => updateNested('home.gallery.images', (formData.home.gallery?.images || []).filter((_, i) => i !== index));
  const updateGalleryImage = (index: number, value: string) => {
      const current = [...(formData.home.gallery?.images || [])];
      current[index] = value;
      updateNested('home.gallery.images', current);
  }
  const addJapanImage = () => updateNested('home.japanExport.images', [...(formData.home.japanExport?.images || []), '']);
  const removeJapanImage = (index: number) => updateNested('home.japanExport.images', (formData.home.japanExport?.images || []).filter((_, i) => i !== index));
  const updateJapanImage = (index: number, value: string) => {
    const current = [...(formData.home.japanExport?.images || [])];
    current[index] = value;
    updateNested('home.japanExport.images', current);
  }
  const addBotanical = () => updateNested('home.botanicals', [...(formData.home.botanicals || []), { name: 'Thảo mộc mới', desc: 'Mô tả...' }]);
  const removeBotanical = (index: number) => updateNested('home.botanicals', (formData.home.botanicals || []).filter((_, i) => i !== index));

  // Reusable UI Components
  const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
    <div className="mb-8 pb-4 border-b border-stone-200">
      <h3 className="font-serif text-3xl font-bold text-emerald-950">{title}</h3>
      {subtitle && <p className="text-stone-500 text-sm mt-2">{subtitle}</p>}
    </div>
  );

  const GroupCard = ({ title, children, className = "" }: { title?: string, children?: React.ReactNode, className?: string }) => (
    <div className={`bg-white p-8 rounded-2xl border border-stone-200 shadow-sm mb-8 ${className}`}>
       {title && <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-[0.1em] mb-6 pb-2 border-b border-stone-100">{title}</h4>}
       {children}
    </div>
  );

  const InputField = ({ label, path, type = "text", rows = 1, placeholder = "", helpText = "" }: { label: string, path: string, type?: "text" | "textarea", rows?: number, placeholder?: string, helpText?: string }) => {
    const getValue = (obj: any, path: string) => path.split('.').reduce((acc, part) => acc && acc[part], obj) || '';
    const val = getValue(formData, path);

    return (
      <div className="mb-6 last:mb-0">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-2">{label}</label>
        {type === "textarea" ? (
          <textarea 
            rows={rows}
            value={val}
            onChange={(e) => updateNested(path, e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-stone-50/30 transition-all text-sm leading-relaxed"
            placeholder={placeholder}
          />
        ) : (
          <input 
            type="text" 
            value={val}
            onChange={(e) => updateNested(path, e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none bg-stone-50/30 transition-all text-sm font-medium"
            placeholder={placeholder}
          />
        )}
        {helpText && <p className="text-xs text-stone-400 mt-2 italic">{helpText}</p>}
      </div>
    );
  };

  const ImagePreview = ({ url, label }: { url: string, label: string }) => (
     <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">{label}</p>
        <div className="relative group w-full bg-white rounded-lg overflow-hidden border border-stone-200 shadow-sm">
           {url ? (
             <img src={url} alt="Preview" className="w-full h-full object-cover max-h-[300px]" />
           ) : (
             <div className="flex items-center justify-center h-32 text-stone-300 text-xs">Chưa có ảnh</div>
           )}
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 px-8 py-4 flex items-center justify-between mb-8 shadow-sm">
         <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><Home size={20}/></div>
            <div>
                <h1 className="font-serif text-xl font-bold text-emerald-950">Nội Dung Trang</h1>
                <p className="text-xs text-stone-500">Chỉnh sửa text và hình ảnh cho từng trang cụ thể</p>
            </div>
         </div>
         <button 
            onClick={handleSave}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg ${isSaved ? 'bg-green-600 text-white' : 'bg-emerald-950 text-white hover:bg-amber-600'}`}
         >
            <Save size={18} /> {isSaved ? 'Đã Lưu Thành Công!' : 'Lưu Thay Đổi'}
         </button>
      </div>

      <div className="max-w-[1600px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Navigation Sidebar */}
          <div className="lg:w-80 shrink-0">
             <div className="sticky top-32 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="p-4 bg-stone-50 border-b border-stone-100">
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest">Danh Mục Trang</h3>
                </div>
                <div className="flex flex-col p-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                   {menuItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                           setActiveTab(item.id);
                           window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${
                           activeTab === item.id 
                             ? 'bg-emerald-50 text-emerald-900 border border-emerald-100 shadow-sm' 
                             : 'text-stone-600 hover:bg-stone-50 border border-transparent'
                        }`}
                      >
                         <span className={activeTab === item.id ? 'text-amber-600' : 'text-stone-400'}>
                           {item.icon}
                         </span>
                         <div className="flex-1">
                            <div className={`text-sm font-bold ${activeTab === item.id ? 'text-emerald-950' : ''}`}>{item.label}</div>
                         </div>
                         {activeTab === item.id && <ChevronRight size={14} className="text-amber-600" />}
                      </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Editor Content Area */}
          <div className="flex-1 min-w-0">
             <div className="animate-fade-in-up">
                
                {/* HERO */}
                {activeTab === 'hero' && (
                   <>
                     <SectionHeader title="Hero Banner" subtitle="Phần hình ảnh lớn đầu tiên ở Trang Chủ." />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GroupCard title="Nội Dung Text" className="md:col-span-2">
                           <InputField label="Tagline (Trên cùng)" path="hero.topTagline" />
                           <div className="grid grid-cols-2 gap-6">
                              <InputField label="Tiêu đề chính (Lớn)" path="hero.mainTitle" />
                              <InputField label="Tiêu đề phụ (Nghiêng)" path="hero.subTitle" />
                           </div>
                           <InputField label="Mô tả ngắn" path="hero.description" type="textarea" rows={3} />
                           <InputField label="Nút Kêu gọi hành động" path="hero.buttonText" />
                        </GroupCard>
                        <GroupCard title="Hình Ảnh Nền" className="md:col-span-2">
                           <InputField label="URL Ảnh Nền" path="hero.backgroundImage" />
                           <ImagePreview url={formData.hero.backgroundImage} label="Background Hero" />
                        </GroupCard>
                     </div>
                   </>
                )}

                {/* HOME */}
                {activeTab === 'home' && (
                   <>
                     <SectionHeader title="Trang Chủ" subtitle="Các phần nội dung chính trên trang chủ." />
                     <GroupCard title="1. Giới Thiệu (Intro)">
                        <div className="grid grid-cols-2 gap-6">
                           <InputField label="Tagline nhỏ" path="home.intro.tagline" />
                           <InputField label="Text Nổi (Floating Box)" path="home.intro.floatingText" />
                           <InputField label="Tiêu đề 1" path="home.intro.title" />
                           <InputField label="Tiêu đề 2 (Italic)" path="home.intro.subtitle" />
                        </div>
                        <div className="mt-6">
                           <InputField label="Câu Quote lớn" path="home.intro.quote" type="textarea" rows={2} />
                        </div>
                        <div className="grid grid-cols-2 gap-6 mt-6">
                           <InputField label="Đoạn văn trái" path="home.intro.body1" type="textarea" rows={4} />
                           <InputField label="Đoạn văn phải" path="home.intro.body2" type="textarea" rows={4} />
                        </div>
                        <div className="mt-6 pt-6 border-t border-stone-100">
                           <InputField label="Ảnh minh họa Intro" path="home.intro.image" />
                           <ImagePreview url={formData.home.intro.image} label="Ảnh Intro" />
                        </div>
                     </GroupCard>

                     <GroupCard title="2. Thảo Mộc (Botanicals)">
                        <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-stone-100">
                           <InputField label="Tagline" path="home.headers.botanicalsTagline" />
                           <InputField label="Tiêu đề lớn" path="home.headers.botanicalsTitle" />
                           <InputField label="Phụ đề (Italic)" path="home.headers.botanicalsSubtitle" />
                        </div>
                        <div className="mb-4">
                           <p className="text-xs text-stone-500 mb-4 uppercase tracking-wide font-bold">Danh sách thảo mộc hiển thị</p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {(formData.home.botanicals || []).map((herb, idx) => (
                                 <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid gap-3 relative group">
                                    <button 
                                      onClick={() => removeBotanical(idx)}
                                      className="absolute top-2 right-2 p-1 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                       <Trash2 size={16} />
                                    </button>
                                    <input 
                                      value={herb.name} 
                                      onChange={(e) => {
                                        const newItems = [...(formData.home.botanicals || [])];
                                        newItems[idx].name = e.target.value;
                                        updateNested('home.botanicals', newItems);
                                      }}
                                      className="font-bold border border-stone-200 rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-amber-500"
                                      placeholder="Tên thảo mộc"
                                    />
                                    <input 
                                      value={herb.desc} 
                                      onChange={(e) => {
                                        const newItems = [...(formData.home.botanicals || [])];
                                        newItems[idx].desc = e.target.value;
                                        updateNested('home.botanicals', newItems);
                                      }}
                                      className="border border-stone-200 rounded-lg px-3 py-2 w-full text-sm outline-none focus:border-amber-500"
                                      placeholder="Mô tả công dụng"
                                    />
                                 </div>
                              ))}
                           </div>
                           <button 
                                onClick={addBotanical}
                                className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-amber-600 border border-emerald-200 bg-emerald-50 px-6 py-3 rounded-xl transition-colors"
                            >
                                <Plus size={16} /> Thêm Thảo Mộc
                            </button>
                        </div>
                     </GroupCard>

                     <GroupCard title="3. Giá Trị Cốt Lõi">
                        <InputField label="Tiêu đề Section" path="home.values.title" />
                        <InputField label="Mô tả ngắn" path="home.values.description" />
                        <div className="mt-6 space-y-4">
                           <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">3 Giá trị cốt lõi</p>
                           {formData.home.values.items.map((item, idx) => (
                              <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 grid gap-3">
                                 <input 
                                   value={item.title} 
                                   onChange={(e) => {
                                     const newItems = [...formData.home.values.items];
                                     newItems[idx].title = e.target.value;
                                     updateNested('home.values.items', newItems);
                                   }}
                                   className="font-bold border border-stone-200 rounded-lg px-3 py-2 w-full text-sm focus:border-amber-500 outline-none"
                                 />
                                 <textarea 
                                   value={item.desc} 
                                   onChange={(e) => {
                                     const newItems = [...formData.home.values.items];
                                     newItems[idx].desc = e.target.value;
                                     updateNested('home.values.items', newItems);
                                   }}
                                   className="border border-stone-200 rounded-lg px-3 py-2 w-full text-sm focus:border-amber-500 outline-none"
                                   rows={2}
                                 />
                              </div>
                           ))}
                        </div>
                     </GroupCard>
                     
                     <GroupCard title="4. Bộ Sưu Tập Preview">
                        <div className="grid grid-cols-2 gap-6">
                           <InputField label="Tagline Background" path="home.collection.tagline" />
                           <InputField label="Tiêu đề lớn" path="home.collection.title" />
                        </div>
                        <InputField label="Mô tả" path="home.collection.description" type="textarea" rows={3} />
                        <InputField label="Text Nút bấm" path="home.collection.buttonText" />
                        <div className="mt-6 pt-6 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                               <InputField label="Ảnh nền Parallax" path="home.collection.bgImage" />
                               <ImagePreview url={formData.home.collection.bgImage} label="Ảnh nền bộ sưu tập" />
                            </div>
                            <div>
                               <InputField label="Ảnh Sản Phẩm (Nổi bật)" path="home.collection.image" />
                               <ImagePreview url={formData.home.collection.image} label="Ảnh sản phẩm" />
                            </div>
                        </div>
                     </GroupCard>

                     <GroupCard title="5. Cấu hình tiêu đề các mục khác">
                        <h5 className="font-bold text-emerald-800 text-xs uppercase mb-3">Mục Testimonials (Đánh giá)</h5>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                           <InputField label="Tagline" path="home.headers.testimonialsTagline" />
                           <InputField label="Tiêu đề 1" path="home.headers.testimonialsTitle" />
                           <InputField label="Tiêu đề 2 (Nghiêng)" path="home.headers.testimonialsSubtitle" />
                        </div>

                        <h5 className="font-bold text-emerald-800 text-xs uppercase mb-3">Mục Blog & Tin tức</h5>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                           <InputField label="Tagline" path="home.headers.blogTagline" />
                           <InputField label="Tiêu đề 1" path="home.headers.blogTitle" />
                           <InputField label="Tiêu đề 2 (Nghiêng)" path="home.headers.blogSubtitle" />
                        </div>

                        <h5 className="font-bold text-emerald-800 text-xs uppercase mb-3">Mục FAQ</h5>
                        <div className="grid grid-cols-2 gap-4">
                           <InputField label="Tiêu đề chính" path="home.headers.faqTitle" />
                           <InputField label="Mô tả phụ" path="home.headers.faqSubtitle" />
                        </div>
                     </GroupCard>
                     
                     <GroupCard title="6. Banner Tra Cứu">
                        <InputField label="Câu Quote lớn" path="home.traceabilityBanner.quote" type="textarea" rows={2} />
                        <InputField label="Text Nút bấm" path="home.traceabilityBanner.title" />
                        <InputField label="Chữ nền mờ khổng lồ" path="home.traceabilityBanner.bgText" />
                     </GroupCard>
                   </>
                )}

                {/* HOME EXTRA */}
                {activeTab === 'home_extra' && (
                    <>
                        <SectionHeader title="Trưng Bày & Quốc Tế" subtitle="Slide ảnh trình chiếu và Khu vực xuất khẩu Nhật Bản." />
                        <GroupCard title="Slide Ảnh (Gallery)">
                            <InputField label="Tiêu đề Gallery" path="home.gallery.title" />
                            <InputField label="Mô tả" path="home.gallery.description" type="textarea" rows={2} />
                            <div className="mt-6">
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Danh sách ảnh (URL)</label>
                                <div className="space-y-3">
                                    {(formData.home.gallery?.images || []).map((img, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <span className="text-xs text-stone-400 font-mono w-6">{idx + 1}.</span>
                                            <input 
                                                type="text" 
                                                value={img} 
                                                onChange={(e) => updateGalleryImage(idx, e.target.value)}
                                                className="flex-1 px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm outline-none"
                                                placeholder="https://..."
                                            />
                                            <button 
                                                onClick={() => removeGalleryImage(idx)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={addGalleryImage}
                                    className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-amber-600 border border-emerald-200 bg-emerald-50 px-6 py-3 rounded-xl transition-colors"
                                >
                                    <Plus size={16} /> Thêm ảnh
                                </button>
                            </div>
                        </GroupCard>

                        <GroupCard title="Khu Vực Xuất Khẩu Nhật Bản">
                            <InputField label="Tiêu đề chính" path="home.japanExport.title" />
                            <InputField label="Phụ đề (Sub-title)" path="home.japanExport.subTitle" />
                            <InputField label="Nội dung giới thiệu" path="home.japanExport.description" type="textarea" rows={4} />
                            <InputField label="Text trên Badge (Nhãn)" path="home.japanExport.badgeText" />
                            <div className="mt-6 border-t border-stone-100 pt-6">
                                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wide mb-3">Bộ sưu tập ảnh tại Nhật (Japan Gallery)</label>
                                <div className="space-y-3">
                                    {(formData.home.japanExport?.images || []).map((img, idx) => (
                                        <div key={idx} className="flex gap-2 items-center">
                                            <span className="text-xs text-stone-400 font-mono w-6">{idx + 1}.</span>
                                            <input 
                                                type="text" 
                                                value={img} 
                                                onChange={(e) => updateJapanImage(idx, e.target.value)}
                                                className="flex-1 px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm outline-none"
                                                placeholder="https://..."
                                            />
                                            <button 
                                                onClick={() => removeJapanImage(idx)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={addJapanImage}
                                    className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-amber-600 border border-emerald-200 bg-emerald-50 px-6 py-3 rounded-xl transition-colors"
                                >
                                    <Plus size={16} /> Thêm ảnh Nhật Bản
                                </button>
                            </div>
                        </GroupCard>
                    </>
                )}
                
                {/* STORY */}
                {activeTab === 'story' && (
                  <>
                    <SectionHeader title="Trang Câu Chuyện" subtitle="Nội dung trang 'Di Sản' (Story)." />
                    <GroupCard title="Header">
                       <InputField label="Tagline nhỏ (VD: Heritage & Legacy)" path="story.header.tagline" />
                       <div className="grid grid-cols-2 gap-6">
                          <InputField label="Tiêu đề lớn (Dòng 1)" path="story.header.title" />
                          <InputField label="Tiêu đề lớn (Dòng 2 - Nghiêng)" path="story.header.subtitle" />
                       </div>
                       <InputField label="Quote giới thiệu" path="story.header.quote" type="textarea" rows={2} />
                       <InputField label="Ảnh Nền Header" path="story.header.image" />
                       <ImagePreview url={formData.story.header.image} label="Header Story" />
                    </GroupCard>
                    <GroupCard title="Chương 1: Khởi nguồn">
                       <div className="grid grid-cols-2 gap-6">
                          <InputField label="Label (VD: Chương I)" path="story.chapter1.label" />
                          <InputField label="Tiêu đề chương" path="story.chapter1.title" />
                       </div>
                       <InputField label="Quote mở đầu" path="story.chapter1.quote" type="textarea" />
                       <div className="grid grid-cols-[80px_1fr] gap-6">
                          <InputField label="DropCap" path="story.chapter1.dropCapText" placeholder="T" />
                          <InputField label="Nội dung chính" path="story.chapter1.content" type="textarea" rows={6} />
                       </div>
                       <div className="mt-6">
                          <InputField label="Ảnh minh họa" path="story.chapter1.image" />
                          <InputField label="Chú thích ảnh" path="story.chapter1.imageCaption" />
                       </div>
                    </GroupCard>
                    <GroupCard title="Các phần tiếp theo">
                       <InputField label="Tiêu đề Phần 2" path="story.section2.title" />
                       <InputField label="Nội dung Phần 2" path="story.section2.content" type="textarea" rows={4} />
                       <div className="my-8 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
                          <h5 className="font-bold text-emerald-800 text-xs uppercase mb-4">Box Nổi Bật (Highlight)</h5>
                          <InputField label="Tiêu đề Box" path="story.highlight.title" />
                          <InputField label="Nội dung Box" path="story.highlight.content" type="textarea" rows={3} />
                       </div>
                       <InputField label="Tiêu đề Phần 3" path="story.section3.title" />
                       <InputField label="Nội dung Phần 3" path="story.section3.content" type="textarea" rows={4} />
                       <div className="grid grid-cols-2 gap-6 mt-6">
                          <InputField label="Tên người ký" path="story.signature.name" />
                          <InputField label="Vai trò" path="story.signature.role" />
                       </div>
                    </GroupCard>
                  </>
                )}

                {/* PRODUCTS PAGE */}
                {activeTab === 'products' && (
                   <>
                     <SectionHeader title="Trang Sản Phẩm" subtitle="Cấu hình Header và Footer trang bộ sưu tập." />
                     <GroupCard title="Header Trang">
                        <InputField label="Tagline Background" path="productsPage.header.tagline" />
                        <InputField label="Tiêu đề chính" path="productsPage.header.title" />
                        <InputField label="Phụ đề (Italic)" path="productsPage.header.subtitle" />
                     </GroupCard>
                     <GroupCard title="Section B2B / Đại Lý">
                        <InputField label="Tagline nhỏ" path="productsPage.b2b.tagline" />
                        <InputField label="Tiêu đề kêu gọi" path="productsPage.b2b.title" />
                        <InputField label="Nội dung mô tả" path="productsPage.b2b.content" type="textarea" rows={3} />
                        <InputField label="Text Nút bấm" path="productsPage.b2b.buttonText" />
                     </GroupCard>
                   </>
                )}

                {/* PROCESS PAGE */}
                {activeTab === 'process' && (
                   <>
                     <SectionHeader title="Trang Quy Trình" subtitle="Nội dung hiển thị trên trang Process." />
                     <GroupCard title="Header">
                        <InputField label="Tagline Background" path="processPage.header.tagline" />
                        <InputField label="Tiêu đề chính" path="processPage.header.title" />
                        <InputField label="Mô tả / Quote" path="processPage.header.subtitle" type="textarea" />
                     </GroupCard>
                     <GroupCard title="Footer">
                        <InputField label="Câu nói cuối trang (Quote)" path="processPage.bottomQuote" />
                     </GroupCard>
                   </>
                )}

                {/* TRACEABILITY PAGE */}
                {activeTab === 'traceability' && (
                   <>
                     <SectionHeader title="Trang Tra Cứu" subtitle="Trang kiểm tra thông tin đại lý." />
                     <GroupCard title="Nội dung chính">
                        <InputField label="Tiêu đề chính" path="traceabilityPage.header.title" />
                        <InputField label="Hướng dẫn tra cứu" path="traceabilityPage.header.subtitle" type="textarea" rows={2} />
                     </GroupCard>
                   </>
                )}

                {/* CONTACT PAGE */}
                {activeTab === 'contact' && (
                   <>
                     <SectionHeader title="Trang Liên Hệ" subtitle="Cấu hình trang Contact Us." />
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GroupCard title="Header & Thông tin" className="md:col-span-2">
                           <InputField label="Tiêu đề trang" path="contactPage.title" />
                           <InputField label="Phụ đề" path="contactPage.subtitle" type="textarea" rows={2} />
                           <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-stone-100">
                              <InputField label="Label Địa chỉ" path="contactPage.addressLabel" />
                              <InputField label="Label Hotline" path="contactPage.hotlineLabel" />
                              <InputField label="Label Email" path="contactPage.emailLabel" />
                           </div>
                        </GroupCard>
                        <GroupCard title="Form Liên Hệ">
                           <InputField label="Tiêu đề Form" path="contactPage.formTitle" />
                           <div className="grid grid-cols-2 gap-6">
                              <InputField label="Label Tên" path="contactPage.formNameLabel" />
                              <InputField label="Label SĐT" path="contactPage.formPhoneLabel" />
                              <InputField label="Label Quan tâm" path="contactPage.formInterestLabel" />
                              <InputField label="Label Lời nhắn" path="contactPage.formMessageLabel" />
                           </div>
                           <InputField label="Text Nút Gửi" path="contactPage.submitButton" />
                        </GroupCard>
                        <GroupCard title="Tùy chọn Dropdown">
                           <InputField 
                              label="Các lựa chọn (Mỗi dòng 1 mục)" 
                              path="contactPage.interestOptions" 
                              type="textarea" 
                              rows={5} 
                              helpText="Danh sách các mục khách hàng có thể chọn trong phần 'Quan tâm'." 
                           />
                           <div className="-mt-20 opacity-0 h-0 w-0 overflow-hidden"></div>
                           <textarea 
                              rows={5}
                              value={formData.contactPage.interestOptions.join('\n')}
                              onChange={(e) => updateNested('contactPage.interestOptions', e.target.value.split('\n'))}
                              className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-stone-50/30 -mt-12 relative z-10"
                           />
                        </GroupCard>
                     </div>
                   </>
                )}

             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminContent;
